import { useEffect, useRef, useState } from 'react'

/**
 * スクロールして画面に入ったときに、ふわっと表示させるためのフック。
 * 使い方:
 *   const reveal = useReveal(100)          // 100ms 遅れて表示
 *   <div ref={reveal.ref} className={reveal.className} style={reveal.style}>
 *
 * 一度表示したら、それ以降は出しっぱなしにします。
 * （行ったり来たりするたびに消えると、かえって読みにくいため）
 */
export function useReveal(delay = 0) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect() // もう見張らなくてよい
      },
      { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return {
    ref,
    className: isVisible ? 'reveal is-visible' : 'reveal',
    style: { transitionDelay: `${delay}ms` },
  }
}
