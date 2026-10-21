import { pages } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import './CtaBand.css'

/**
 * ページの最後に置く「お問い合わせ」への案内。
 * お問い合わせフォームは /contact/ に移したので、各ページからはここへ案内します。
 */
export default function CtaBand() {
  const box = useReveal(0)

  return (
    <section className="section cta-band" aria-labelledby="cta-band-title">
      <div className={`container cta-band__box ${box.className}`} ref={box.ref} style={box.style}>
        <h2 id="cta-band-title" className="cta-band__title">
          まずは、無料相談から
        </h2>
        <p className="cta-band__text">
          今の業務の困りごとを、30〜60分でお聞きします。何から始めればいいかわからない段階でも大丈夫です。
        </p>
        <div className="cta-band__actions">
          <a className="button" href={pages.contact}>
            お問い合わせ
            <span className="button__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
