import { useEffect, useState } from 'react'
import { company } from '../data/site.js'
import { heroSlides, heroActions, heroStats, heroNote } from '../data/hero.js'
import './Hero.css'

// 写真が切り替わる間隔（ミリ秒）
const SLIDE_MS = 6000

/**
 * トップの大きな画面。
 * 背景の写真がゆっくり拡大しながら、順番に入れ替わります。
 *
 * ・自動送りは「動きを減らす」設定の人には行いません（アクセシビリティ）
 * ・下のドットを押すと、その写真に切り替わります
 */
export default function Hero() {
  const [active, setActive] = useState(0)
  // 押したドットで送り直せるように、タイマーを作り直すためのきっかけ
  const [restart, setRestart] = useState(0)

  useEffect(() => {
    // 動きを減らす設定の人には、自動で切り替えない
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || heroSlides.length < 2) return

    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % heroSlides.length),
      SLIDE_MS,
    )
    return () => clearInterval(timer)
  }, [restart])

  const goTo = (index) => {
    setActive(index)
    setRestart((n) => n + 1) // タイマーを最初から数え直す
  }

  // 見出しを1文字ずつに分けて、順番に浮かび上がらせる
  const titleChars = [...company.tagline]

  return (
    <section className="hero">
      {/* ===== 背景の写真（ゆっくり動きながら入れ替わる） ===== */}
      <div className="hero__media" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__slide${index === active ? ' is-active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="hero__veil" />
        <div className="hero__aurora hero__aurora--1" />
        <div className="hero__aurora hero__aurora--2" />
        <div className="hero__grid" />
      </div>

      {/* ===== 文字とボタン ===== */}
      <div className="hero__inner">
        <p className="hero__badge">
          <span className="hero__badge-dot" />
          広島発・ITコンサルティング / システム開発
        </p>

        <h1 className="hero__title">
          {titleChars.map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="hero__char"
              style={{ animationDelay: `${300 + index * 90}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="hero__lead">{company.lead}</p>

        <div className="hero__actions">
          {heroActions.map((action) => (
            <a
              key={action.id}
              href={action.href}
              className={`button${action.variant === 'ghost' ? ' button--ghost' : ''}`}
            >
              {action.label}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>

        <p className="hero__note">
          <a href={heroNote.href}>{heroNote.label}</a>
        </p>

        <dl className="hero__stats">
          {heroStats.map((stat) => (
            <div className="hero__stat" key={stat.id}>
              <dt className="hero__stat-value">
                {stat.value}
                {stat.unit && <span className="hero__stat-unit">{stat.unit}</span>}
              </dt>
              <dd className="hero__stat-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ===== 今どの写真かを示すドット ===== */}
      <div className="hero__dots">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero__dot${index === active ? ' is-active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`${slide.caption}の写真を表示`}
            aria-current={index === active}
          >
            <span className="hero__dot-bar" />
            <span className="hero__dot-label">{slide.caption}</span>
          </button>
        ))}
      </div>

      {/* ===== 下へどうぞ、の合図 ===== */}
      <a className="hero__scroll" href="#services" aria-label="下へスクロール">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">SCROLL</span>
      </a>
    </section>
  )
}
