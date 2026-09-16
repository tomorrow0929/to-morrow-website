import logo from '../assets/logo.svg'
import { company } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import './About.css'

export default function About() {
  const head = useReveal(0)
  const panel = useReveal(120)

  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        {/* 左：見出しと会社の情報 */}
        <div className="about__main" ref={head.ref} style={head.style}>
          <p className={`eyebrow ${head.className}`}>About</p>
          <h2 className={`section-title about__title ${head.className}`}>事業者情報</h2>

          <dl className={`about__list ${head.className}`}>
            {company.profile.map((row) => (
              <div className="about__row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 右：ロゴと理念を載せた、光るパネル */}
        <div className={`about__panel ${panel.className}`} ref={panel.ref} style={panel.style}>
          <div className="about__panel-glow" aria-hidden="true" />
          <img src={logo} alt={`${company.name} ロゴ`} className="about__logo" />
          <p className="about__tagline">{company.tagline}</p>
          <p className="about__lead">{company.lead}</p>
        </div>
      </div>
    </section>
  )
}
