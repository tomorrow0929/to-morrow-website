import { useRef, useState } from 'react'
import { useRecaptcha } from '../hooks/useRecaptcha.js'
import { contactEndpoint } from '../data/site.js'
import './Contact.css'

// 送信先URL。既定は src/data/site.js の値で、
// 環境変数 VITE_CONTACT_ENDPOINT があればそちらを優先します。
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || contactEndpoint

// 実用的なメール形式チェック（<input type="email"> のチェックも併用）
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

/**
 * 用件の選択肢。
 *
 * 【なぜ選ばせるか】
 * 無料プラグインを配っているため、問い合わせが「不具合の報告」と
 * 「有料の依頼」の両方で来る。用件が分からないと、返信の優先度も
 * 返し方も決められない。
 *
 * note は選んだときに下に出す一言。
 * 先に書いておくことで、あとから聞き直す往復を減らす。
 * 文面はサポート範囲・利用規約と矛盾させないこと。
 */
const SUBJECT_OPTIONS = [
  {
    value: '無料相談（AI活用）',
    note: '30〜60分、オンラインまたは対面で承ります。困っている作業を1つ書いていただければ、当日その場でAIを使って解決を試みます。',
  },
  {
    value: 'AI・IT伴走顧問',
    note: '今の業務の流れと、相談したいこと（講習・IT運用など）を書いてください。お見積りまで費用はかかりません。',
  },
  {
    value: '動画制作・無料試作',
    note: '初めての方は無料で試作します。動画の用途（企業紹介・SNSなど）と、イメージに近い参考があれば書いてください。',
  },
  {
    value: '動画内製化',
    note: '動画を作る予定の方の人数と、今どのように動画を用意しているかを書いてください。',
  },
  {
    value: 'Webサイト制作',
    note: '作りたいサイトの内容と、参考にしたいサイト（あれば）を書いてください。お見積りまで費用はかかりません。',
  },
  {
    value: 'kintone無料プラグインについて',
    note: '不具合のご報告も無償で受け付けています。プラグイン名と、再現する手順を書いていただけると早く直せます（返信は週2回まとめてお返しします）。',
  },
  { value: 'その他', note: '' },
]

const FIELDS = [
  {
    name: 'subject',
    label: 'ご用件',
    type: 'select',
    requiredMessage: 'ご用件を選択してください。',
  },
  {
    name: 'name',
    label: 'お名前',
    type: 'text',
    placeholder: '山田 太郎',
    requiredMessage: 'お名前を入力してください。',
  },
  {
    name: 'email',
    label: 'メールアドレス',
    type: 'email',
    placeholder: 'taro@example.com',
    requiredMessage: 'メールアドレスを入力してください。',
    formatMessage: 'メールアドレスの形式が正しくありません。',
  },
  {
    name: 'message',
    label: 'お問い合わせ内容',
    type: 'textarea',
    placeholder: 'できるだけ具体的にご記入ください',
    requiredMessage: 'お問い合わせ内容を入力してください。',
  },
]

const EMPTY_VALUES = { subject: '', name: '', email: '', message: '' }

/**
 * お問い合わせフォーム。
 * 送信の仕組み（送信先・項目・入力チェック・reCAPTCHA）は、どこに置いても同じです。
 *
 * headingLevel：見出しの階層。お問い合わせページ（/contact/）では、ページの見出しなので 'h1'
 * notice：見出しのすぐ下に出す案内（例：無料相談の案内）
 */
export default function Contact({ headingLevel = 'h2', notice = '' }) {
  const Heading = headingLevel
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', text: string }
  const inputRefs = useRef({})
  const { getToken } = useRecaptcha()

  // 選ばれた用件に応じた案内文（SUBJECT_OPTIONS の note）
  const subjectNote = SUBJECT_OPTIONS.find((o) => o.value === values.subject)?.note || ''

  const validate = (name, value) => {
    const field = FIELDS.find((f) => f.name === name)
    const trimmed = value.trim()
    if (!trimmed) return field.requiredMessage
    if (name === 'email' && !EMAIL_PATTERN.test(trimmed)) return field.formatMessage
    return null
  }

  const handleChange = (name) => (event) => {
    const value = event.target.value
    setValues((prev) => ({ ...prev, [name]: value }))
    // 入力中は、直っていればエラー表示を消す
    if (errors[name] && !validate(name, value)) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)

    const nextErrors = {}
    for (const field of FIELDS) {
      const error = validate(field.name, values[field.name])
      if (error) nextErrors[field.name] = error
    }
    setErrors(nextErrors)

    const firstInvalid = FIELDS.find((field) => nextErrors[field.name])
    if (firstInvalid) {
      inputRefs.current[firstInvalid.name]?.focus()
      setStatus({
        type: 'error',
        text: '未入力または形式に誤りがあります。各項目をご確認ください。',
      })
      return
    }

    setIsSending(true)
    try {
      const formData = new FormData()
      for (const field of FIELDS) formData.append(field.name, values[field.name].trim())

      // Formspree は _subject を通知メールの件名に使う。
      // 用件を件名に入れておくと、受信箱を開いた時点で仕分けできる。
      // 仕様が変わって効かなくなっても、ただのフィールドが1つ増えるだけ。
      formData.append(
        '_subject',
        `[${values.subject.trim()}] ${values.name.trim()} さまからのお問い合わせ`,
      )

      const token = await getToken('contact')
      if (token) formData.append('recaptchaToken', token)

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) {
        // Formspree はエラー時に理由をJSONで返すので、拾えれば表示する
        const detail = await response
          .json()
          .then((d) => d?.errors?.map((e) => e.message).join(' / ') || d?.error)
          .catch(() => null)
        throw new Error(detail || 'send_failed')
      }

      setStatus({ type: 'success', text: '送信が完了しました。担当よりご連絡いたします。' })
      setValues(EMPTY_VALUES)

      // 問い合わせ成立をGA4に記録する。
      // これを「キーイベント」に設定すると、どの流入・どのページから
      // 問い合わせにつながったかがレポートで追えるようになります。
      // 計測が未設定のときは window.gtag が無いので何も起きません。
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          form_name: 'contact',
          // 用件を一緒に送る。KPIで数えるのは「有料の相談」だけなので、
          // これが無いと不具合報告と区別できない（計画書 第12章）
          contact_subject: values.subject.trim(),
          page_location: window.location.href,
        })
      }
    } catch (error) {
      const detail = error?.message && error.message !== 'send_failed' ? `（${error.message}）` : ''
      setStatus({
        type: 'error',
        text: `送信に失敗しました。時間をおいて再度お試しください。${detail}`,
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      {/* 背景の飾り（うっすら動く光） */}
      <div className="contact__glow contact__glow--1" aria-hidden="true" />
      <div className="contact__glow contact__glow--2" aria-hidden="true" />

      <div className="container contact__inner">
        <div className="section-head contact__head">
          <p className="eyebrow contact__eyebrow">Contact</p>
          <Heading className="section-title contact__title">お問い合わせ</Heading>
          {notice && <p className="contact__notice">{notice}</p>}
          <p className="section-lead contact__lead">
            ご相談・お見積りは無料です。設定を変えるだけで解決できる場合は、そのようにお伝えします。
          </p>
        </div>

        <div className="contact__card">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {FIELDS.map((field) => {
          const errorId = `err-${field.name}`
          const hasError = Boolean(errors[field.name])
          const shared = {
            id: `${field.name}-field`,
            name: field.name,
            value: values[field.name],
            placeholder: field.placeholder,
            onChange: handleChange(field.name),
            ref: (el) => { inputRefs.current[field.name] = el },
            'aria-invalid': hasError || undefined,
            'aria-describedby': hasError ? errorId : undefined,
          }

          return (
            <label className="field" key={field.name}>
              <span className="field-label">{field.label}</span>

              {/*
                is-placeholder は未選択のあいだだけ付ける。
                form に noValidate を付けているため CSS の :invalid が当たらず、
                「選択してください」を薄い色にできないので、クラスで切り替えている。
              */}
              {field.type === 'select' ? (
                <select
                  {...shared}
                  className={`select${values[field.name] ? '' : ' is-placeholder'}${
                    hasError ? ' is-error' : ''
                  }`}
                >
                  <option value="">選択してください</option>
                  {SUBJECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  {...shared}
                  className={`textarea${hasError ? ' is-error' : ''}`}
                  rows={5}
                />
              ) : (
                <input
                  {...shared}
                  type={field.type}
                  inputMode={field.type === 'email' ? 'email' : undefined}
                  className={`input${hasError ? ' is-error' : ''}`}
                />
              )}

              {/* 選んだ用件に応じた案内。往復を減らすために先に出す */}
              {field.name === 'subject' && subjectNote && (
                <p className="field-note">{subjectNote}</p>
              )}

              <p className="field-error" id={errorId} aria-live="polite">
                {errors[field.name]}
              </p>
            </label>
          )
        })}

        <button className="button" type="submit" disabled={isSending}>
          {isSending ? '送信中…' : '送信する'}
          {!isSending && (
            <span className="button__arrow" aria-hidden="true">
              →
            </span>
          )}
        </button>
      </form>

          <p className={`message-area${status ? ` is-${status.type}` : ''}`} aria-live="polite">
            {status?.text}
          </p>
        </div>
      </div>
    </section>
  )
}
