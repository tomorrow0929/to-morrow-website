import { useReveal } from '../hooks/useReveal.js'

export default function ServiceCardItem({ item, variant = 'plain', delay = 0 }) {
  const reveal = useReveal(delay)

  const classNames = [
    'tile',
    `tile--${variant}`,
    item.tone ? `tile--${item.tone}` : '',
    reveal.className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={reveal.ref} className={classNames} style={reveal.style}>
      <div className="tile__media">
        <img src={item.image} alt={item.imageAlt} loading="lazy" />
      </div>

      <div className="tile__body">
        <h4 className="tile__title">{item.title}</h4>
        <p className="tile__desc">{item.description}</p>
      </div>

      {item.action && (
        <div className="tile__actions">
          {item.action.href ? (
            <a
              href={item.action.href}
              className="button button--sm"
              {...(item.action.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {item.action.label}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
          ) : (
            <button type="button" className="button button--sm" disabled>
              {item.action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
