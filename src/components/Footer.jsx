import { company, footerLinks, snsLinks } from '../data/site.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        &copy; {year} {company.name}
        {footerLinks.map((link) => (
          <span key={link.label}>
            {' | '}
            <a href={link.href}>{link.label}</a>
          </span>
        ))}
      </p>
      <div className="sns-links">
        {snsLinks.map((link, index) => (
          <span key={link.label}>
            {index > 0 && ' | '}
            <a href={link.href}>{link.label}</a>
          </span>
        ))}
      </div>
    </footer>
  )
}
