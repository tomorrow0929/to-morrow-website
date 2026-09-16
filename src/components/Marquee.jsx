import { marqueeItems } from '../data/hero.js'
import './Marquee.css'

/**
 * ヒーローのすぐ下を、キーワードが右から左へ流れる帯。
 * 「何ができる会社か」を一目で伝えるための飾りです。
 *
 * 同じ並びを2回ぶん並べてあります。
 * 1組ぶん（-50%）ずらし終えたところで最初に戻るので、切れ目なくつながって見えます。
 */
export default function Marquee() {
  return (
    <div className="marquee" aria-label="対応できる領域">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul className="marquee__group" key={copy} aria-hidden={copy === 1}>
            {marqueeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
