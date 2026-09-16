import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { navLinks, company } from '../data/site.js'
import './Header.css'

/**
 * 画面の一番上に貼り付くヘッダー。
 *
 * ・トップの写真の上では透明、少しスクロールするとすりガラスに変わります
 * ・スマホでは右上のボタンでメニューを開きます
 * ・一番上の細い線は「ページのどのあたりを見ているか」を表します
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)

      // ページ全体のうち、今どこまで読んだかの割合（0〜1）
      const scrollable = document.body.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }

    onScroll() // 再読み込みで途中から開いたときのために、最初に一度計算する
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // メニューを開いているあいだは、後ろの本文がスクロールしないようにする
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Escキーでメニューを閉じられるようにする
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  return (
    <header
      className={`site-header${isScrolled ? ' is-scrolled' : ''}${
        isMenuOpen ? ' is-open' : ''
      }`}
    >
      <div className="site-header__bar">
        <a className="site-header__logo" href="#top" aria-label={`${company.name} トップへ`}>
          <img src={logo} alt={`${company.name} ロゴ`} className="logo" />
        </a>

        <nav className="site-header__nav" aria-label="メインメニュー">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="button button--sm site-header__cta" href="#contact">
          無料相談
          <span className="button__arrow" aria-hidden="true">
            →
          </span>
        </a>

        {/* スマホ用の開閉ボタン。3本線が×印に変わります */}
        <button
          type="button"
          className="site-header__toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <span />
          <span />
        </button>
      </div>

      {/* 読んだ量を示す細い線 */}
      <span className="site-header__progress" style={{ transform: `scaleX(${progress})` }} />

      {/* ===== スマホで開くメニュー ===== */}
      <div className="site-menu" id="mobile-menu" hidden={!isMenuOpen}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.href} style={{ transitionDelay: `${120 + index * 70}ms` }}>
              <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                <span className="site-menu__index">{String(index + 1).padStart(2, '0')}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="button site-menu__cta" href="#contact" onClick={() => setIsMenuOpen(false)}>
          無料で相談する
          <span className="button__arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </header>
  )
}
