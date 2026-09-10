import { company } from '../data/site.js'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-text">{company.tagline}</h1>
      <p className="hero-text">{company.lead}</p>
      <a href="#contact" className="button">
        無料相談はこちら
      </a>
    </section>
  )
}
