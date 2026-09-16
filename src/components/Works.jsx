import { works } from '../data/services.js'
import './Works.css'

export default function Works() {
  return (
    <section id="works" className="section works">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Works</p>
          <h2 className="section-title">実績</h2>
        </div>
        <ul className="works__list">
          {works.map((work) => (
            <li key={work}>{work}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
