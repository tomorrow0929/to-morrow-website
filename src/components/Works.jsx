import { works } from '../data/services.js'
import './Works.css'

export default function Works() {
  return (
    <section id="works" className="works">
      <h2>実績</h2>
      <ul>
        {works.map((work) => (
          <li key={work}>{work}</li>
        ))}
      </ul>
    </section>
  )
}
