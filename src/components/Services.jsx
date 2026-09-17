import { services } from '../data/services.js'
import { useReveal } from '../hooks/useReveal.js'
import ServiceCard from './ServiceCard.jsx'
import './Services.css'

export default function Services() {
  const head = useReveal(0)

  return (
    <section id="services" className="section services">
      {/* 背景の飾り（うっすら光る円）。内容には関係しません */}
      <div className="services__glow" aria-hidden="true" />

      <div className="container">
        <div className="section-head" ref={head.ref} style={head.style}>
          <p className={`eyebrow ${head.className}`}>Services</p>
          <h2 className={`section-title ${head.className}`}>事業内容</h2>
          <p className={`section-lead ${head.className}`}>
            つくる・支える・伴走する。AI活用やSNS運用から、kintoneの業務システム、Webサイトまで、
            「次の一歩」に必要なものを一緒に形にします。
          </p>
        </div>

        <div className="service-cards">
          {services
            .filter((service) => service.published)
            .map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
        </div>
      </div>
    </section>
  )
}
