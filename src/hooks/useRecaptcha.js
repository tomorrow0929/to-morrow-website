import { useEffect, useState } from 'react'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

/**
 * reCAPTCHA v3 を使うためのフック。
 * .env に VITE_RECAPTCHA_SITE_KEY が無ければ、何も読み込まず無効のまま動きます。
 */
export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!SITE_KEY) return
    if (document.querySelector('script[data-recaptcha]')) {
      setIsReady(true)
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true
    script.dataset.recaptcha = 'true'
    script.onload = () => setIsReady(true)
    document.head.appendChild(script)
  }, [])

  /** 送信直前に呼ぶとトークンを返します（無効なら null） */
  const getToken = async (action = 'contact') => {
    if (!SITE_KEY || !isReady || !window.grecaptcha) return null
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          resolve(await window.grecaptcha.execute(SITE_KEY, { action }))
        } catch {
          resolve(null)
        }
      })
    })
  }

  return { isEnabled: Boolean(SITE_KEY), getToken }
}
