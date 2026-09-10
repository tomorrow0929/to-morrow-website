import { services } from '../data/services.js'
import ServiceCard from './ServiceCard.jsx'
import './Services.css'

export default function Services() {
  return (
    <section id="services" className="services">
      <h2>事業内容</h2>
      <div className="service-cards">
        {services
          .filter((service) => service.published)
          .map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
      </div>
    </section>
  )
}
