import { voices } from '../data/services.js'
import './Voices.css'

export default function Voices() {
  return (
    <section id="voices" className="voices">
      <h2>お客様の声</h2>
      <div className="voice-list">
        {voices.map((voice) => (
          <blockquote key={voice.author}>
            <p>「{voice.quote}」</p>
            <cite>{voice.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
