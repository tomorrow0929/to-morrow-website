import { useReveal } from '../hooks/useReveal.js'
import ServiceCardItem from './ServiceCardItem.jsx'

export default function ServiceCard({ service, index = 0 }) {
  const reveal = useReveal(0)

  return (
    <article ref={reveal.ref} className={`card ${reveal.className}`} style={reveal.style}>
      {/* 背景写真と、その上に敷く暗い膜 */}
      <div
        className="card__bg"
        style={{ backgroundImage: `url(${service.backgroundImage})` }}
        aria-hidden="true"
      />

      <header className="card__head">
        <span className="card__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="card__title">{service.title}</h3>
        <p className="card__desc">{service.description}</p>
      </header>

      <div className="card__grid">
        {service.items.map((item, itemIndex) => (
          <ServiceCardItem
            key={item.id}
            item={item}
            variant={service.itemVariant}
            delay={(itemIndex % 4) * 110}
          />
        ))}
      </div>

      {service.actions && (
        <div className="card__actions">
          {service.actions.map((action) =>
            action.href ? (
              <a
                key={action.id}
                href={action.href}
                className={`button${action.variant === 'outline' ? ' button--ghost' : ''}`}
              >
                {action.label}
                <span className="button__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <button
                key={action.id}
                type="button"
                className={`button${action.variant === 'outline' ? ' button--ghost' : ''}`}
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
