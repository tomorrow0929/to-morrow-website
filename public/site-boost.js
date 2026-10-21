/**
 * 表示を速くするための共通スクリプト（トップ・to.Morrowとは・お問い合わせ・下層ページで共通）。
 *
 * 1. フォント（Noto Sans JP）
 *    日本語フォントは丸ごと読むと重く、文字が出るまで待たされます。
 *    ページの表示が終わってから、「このページで使っている文字だけ」を Google Fonts に頼みます。
 *    文章を書き換えても、ここが自動で文字を集め直すので作業は要りません。
 *    （それまでは端末のフォントで表示されます）
 *
 * 2. アクセス計測（/analytics.js）
 *    表示が終わってから読み込みます。測定IDは public/analytics.js の1か所です。
 */
;(function () {
  var FONT_FAMILIES = 'family=Noto+Sans+JP:wght@400;500;700;800;900'

  function loadFonts() {
    var text = document.body ? document.body.textContent : ''
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      text += el.placeholder
    })
    // フォームのエラーなど、あとから出る文章でよく使う文字
    text += '送信しました失敗入力してください選択メールアドレス形式確認中'
    var seen = {}
    var chars = ''
    Array.from(text.replace(/\s/g, '')).forEach(function (c) {
      if (!seen[c]) {
        seen[c] = true
        chars += c
      }
    })
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?' + FONT_FAMILIES + '&display=swap&text=' + encodeURIComponent(chars)
    document.head.appendChild(link)
  }

  function loadAnalytics() {
    var s = document.createElement('script')
    s.src = '/analytics.js'
    document.head.appendChild(s)
  }

  function afterLoad(fn, idle) {
    var run = function () {
      if (idle && 'requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 3000 })
      else requestAnimationFrame(function () { setTimeout(fn, 0) })
    }
    if (document.readyState === 'complete') run()
    else window.addEventListener('load', run)
  }

  afterLoad(loadFonts, false)
  afterLoad(loadAnalytics, true)
})()
