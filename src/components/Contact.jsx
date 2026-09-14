import { useRef, useState } from 'react'
import { useRecaptcha } from '../hooks/useRecaptcha.js'
import { contactEndpoint } from '../data/site.js'
import './Contact.css'

// 送信先URL。既定は src/data/site.js の値で、
// 環境変数 VITE_CONTACT_ENDPOINT があればそちらを優先します。
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || contactEndpoint

// 実用的なメール形式チェック（<input type="email"> のチェックも併用）
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

const FIELDS = [
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
    placeholder: 'ご用件をご記入ください',
    requiredMessage: 'お問い合わせ内容を入力してください。',
  },
]

const EMPTY_VALUES = { name: '', email: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', text: string }
  const inputRefs = useRef({})
  const { getToken } = useRecaptcha()

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
    <section id="contact" className="contact-section">
      <h2 className="contact-title">お問い合わせ</h2>

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

              {field.type === 'textarea' ? (
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

              <p className="field-error" id={errorId} aria-live="polite">
                {errors[field.name]}
              </p>
            </label>
          )
        })}

        <button className="button" type="submit" disabled={isSending}>
          {isSending ? '送信中…' : '送信'}
        </button>
      </form>

      <p className={`message-area${status ? ` is-${status.type}` : ''}`} aria-live="polite">
        {status?.text}
      </p>
    </section>
  )
}
