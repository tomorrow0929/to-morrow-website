import logo from '../assets/logo.svg'
import { navLinks, company } from '../data/site.js'
import './Header.css'

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__logo">
        <img src={logo} alt={`${company.name} ロゴ`} className="logo" />
      </div>
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
