import { useReveal } from '../hooks/useReveal.js'

export default function ServiceCardItem({ item, variant = 'plain', delay = 0 }) {
  const reveal = useReveal(delay)

  const classNames = [
    'card-grid-item',
    `card-grid-item--${variant}`,
    item.tone ? `card-grid-item--${item.tone}` : '',
    reveal.className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={reveal.ref} className={classNames} style={reveal.style}>
      <img src={item.image} alt={item.imageAlt} loading="lazy" />

      <div className="card-grid-item__body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      {item.action && (
        <div className="card-grid-item__actions">
          {item.action.href ? (
            <a href={item.action.href} className="button">
              {item.action.label}
            </a>
          ) : (
            <button type="button" className="button">
              {item.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
