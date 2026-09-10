import { company, footerLinks, snsLinks } from '../data/site.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  // URLが未設定のものは出さない（押しても何も起きないリンクを作らないため）
  const links = footerLinks.filter((link) => link.href)
  const sns = snsLinks.filter((link) => link.href)

  return (
    <footer className="site-footer">
      <p>
        &copy; {year} {company.name}
        {links.map((link) => (
          <span key={link.label}>
            {' | '}
            <a href={link.href}>{link.label}</a>
          </span>
        ))}
      </p>
      {sns.length > 0 && (
        <div className="sns-links">
          {sns.map((link, index) => (
            <span key={link.label}>
              {index > 0 && ' | '}
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </span>
          ))}
        </div>
      )}
    </footer>
  )
}
