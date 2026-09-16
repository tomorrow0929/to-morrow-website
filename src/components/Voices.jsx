import { voices } from '../data/services.js'
import './Voices.css'

export default function Voices() {
  return (
    <section id="voices" className="section voices">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Voices</p>
          <h2 className="section-title">お客様の声</h2>
        </div>
        <div className="voice-list">
          {voices.map((voice) => (
            <blockquote key={voice.author}>
              <p>「{voice.quote}」</p>
              <cite>{voice.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
