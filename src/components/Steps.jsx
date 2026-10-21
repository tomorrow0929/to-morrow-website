import { steps, pages } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import './Steps.css'

/**
 * 進め方（3ステップ）。
 * トップでは短い説明（text）、「to.Morrowとは」ページでは detail を出します。
 *
 * detailed：true にすると、くわしい説明を出す（「to.Morrowとは」ページ用）
 * headingId：見出しの id（ページ内リンク用）
 */
export default function Steps({ detailed = false, headingId = 'steps-title' }) {
  const head = useReveal(0)
  const list = useReveal(120)

  return (
    <section id="steps" className="section steps" aria-labelledby={headingId}>
      <div className="container">
        <div className="section-head" ref={head.ref} style={head.style}>
          <p className={`eyebrow ${head.className}`}>Process</p>
          <h2 id={headingId} className={`section-title ${head.className}`}>
            進め方
          </h2>
          {detailed && (
            <p className={`section-lead ${head.className}`}>
              「集める」「組み立てる」「強くする」の3つの段階で、会社の業務の土台をつくります。
            </p>
          )}
        </div>

        <ol className={`steps__list ${list.className}`} ref={list.ref} style={list.style}>
          {steps.map((step) => (
            <li className="steps__item" key={step.no}>
              <span className="steps__no" aria-hidden="true">
                {step.no}
              </span>
              <h3 className="steps__title">{step.title}</h3>
              <p className="steps__text">{detailed ? step.detail : step.text}</p>
            </li>
          ))}
        </ol>

        {!detailed && (
          <div className="steps__actions">
            <a className="button button--ghost" href={pages.about}>
              to.Morrowとは
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="button" href={pages.contact}>
              お問い合わせ
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
