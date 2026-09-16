import logo from '../assets/logo.svg'
import { company, footerLinks, snsLinks, navLinks } from '../data/site.js'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  // URLが未設定のものは出さない（押しても何も起きないリンクを作らないため）
  const links = footerLinks.filter((link) => link.href)
  const sns = snsLinks.filter((link) => link.href)

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src={logo} alt={`${company.name} ロゴ`} className="site-footer__logo" />
          <p className="site-footer__lead">{company.lead}</p>
          <a className="button button--sm" href="#contact">
            無料で相談する
            <span className="button__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <nav className="site-footer__nav" aria-label="フッターメニュー">
          <div className="site-footer__col">
            <h2 className="site-footer__heading">メニュー</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {links.length > 0 && (
            <div className="site-footer__col">
              <h2 className="site-footer__heading">ご案内</h2>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sns.length > 0 && (
            <div className="site-footer__col">
              <h2 className="site-footer__heading">SNS</h2>
              <ul>
                {sns.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>

      <div className="container site-footer__bottom">
        <p>
          &copy; {year} {company.name}
        </p>
      </div>
    </footer>
  )
}
