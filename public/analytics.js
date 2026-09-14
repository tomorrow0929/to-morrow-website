/**
 * GA4（Googleアナリティクス）の読み込み。
 *
 * 【測定IDはこのファイルの1箇所だけ】
 * このサイトは React のトップページと、public/ に置いた素のHTML（料金・帳票など）が
 * 混在しているため、各HTMLから同じこのファイルを読み込む形にしています。
 * IDを変えるときは下の GA_ID だけを書き換えてください。
 *
 * 【プラグイン配布サイトと同じ測定IDを使う理由】
 * GA4は「データストリームごと」にセッションを数えます。
 * 別々のIDにすると、plugins.to-morrow.net でプラグインを見た人が
 * to-morrow.net の料金ページに来た時点で別セッション扱いになり、
 * 「どのプラグインを見た人が問い合わせたか」がつながらなくなります。
 * 同じIDにしておけば1つの流れとして追えます。
 * サイトごとの数字を見たいときは、レポートの「ホスト名」で分けられます。
 */
;(function () {
  var GA_ID = 'G-ZWKGFXQWPR'

  if (!GA_ID || window.gtag) return

  var script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  // gtag は arguments をそのまま積む仕様なので、アロー関数にはできません
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_ID)
})()
