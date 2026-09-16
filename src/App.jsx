import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Services from './components/Services.jsx'
import Works from './components/Works.jsx'
import Voices from './components/Voices.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { features } from './data/site.js'

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <Services />
        {/* 公開したくなったら src/data/site.js の features を true にするだけ */}
        {features.works && <Works />}
        {features.voices && <Voices />}
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
