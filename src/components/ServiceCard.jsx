import { useReveal } from '../hooks/useReveal.js'
import ServiceCardItem from './ServiceCardItem.jsx'

export default function ServiceCard({ service }) {
  const reveal = useReveal(0)

  return (
    <article
      ref={reveal.ref}
      className={`card ${reveal.className}`}
      style={{ ...reveal.style, backgroundImage: `url(${service.backgroundImage})` }}
    >
      <div className="card-text">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>

      <div className="card-grid">
        {service.items.map((item, index) => (
          <ServiceCardItem
            key={item.id}
            item={item}
            variant={service.itemVariant}
            delay={(index % 4) * 100}
          />
        ))}
      </div>

      {service.actions && (
        <div className="card-actions">
          {service.actions.map((action) =>
            action.href ? (
              <a
                key={action.id}
                href={action.href}
                className={`button button--${action.variant}`}
              >
                {action.label}
              </a>
            ) : (
              <button
                key={action.id}
                type="button"
                className={`button button--${action.variant}`}
              >
                {action.label}
              </button>
            ),
          )}
        </div>
      )}
    </article>
  )
}
