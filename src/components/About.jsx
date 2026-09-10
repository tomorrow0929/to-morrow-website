import logo from '../assets/logo.svg'
import { company } from '../data/site.js'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <h2>事業者情報</h2>
      <div className="about__content">
        <dl className="about__list">
          {company.profile.map((row) => (
            <div className="about__item" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="about__image">
          <img src={logo} alt={`${company.name} ロゴ`} className="logo-about" />
        </div>
      </div>
    </section>
  )
}
