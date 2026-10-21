// サイト全体の基本情報。文言の修正はこのファイルだけで完結します。

export const company = {
  // 屋号（個人事業）。法人を設立したら「合同会社to.Morrow」に変更してください。
  // ※ 会社法7条により、法人登記が済むまで名称に「合同会社」は使えません。
  name: 'to.Morrow',
  // トップの大きな見出し（キャッチコピー）
  tagline: '会社の土台を、強くする。',
  // フッターなどに出す一言
  lead: 'AIとITで、中小企業の「業務の土台」をつくる',
  // トップの見出しの下に出すリード文（段落ごとに分けています）
  heroLead: [
    'to.Morrowは、AIとITで中小企業の「業務の土台」をつくります。',
    '散らばったExcel、紙の記録、特定の人に頼りきりの作業。ひとつずつ仕組みに置き換えて、会社を内側から強くしていきます。',
    'つくって終わりにはしません。現場の方が自分たちで育てていけるように、使いこなせる人も一緒に育てます。',
  ],
  // いちばん伝えたい考え方（「to.Morrowとは」ページで使います）
  message: 'AIを使いこなせる人の共通点は、「判断ができる人」と「責任が取れる人」。',
  profile: [
    { label: '屋号', value: 'to.Morrow' },
    { label: '所在地', value: '広島県広島市西区' },
    { label: '代表', value: '今井 渓' },
    { label: '事業内容', value: 'AI・IT伴走顧問 / AI動画制作・動画内製化 / Webサイト制作 / kintone無料プラグインの配布' },
    { label: '理念', value: 'ITの力で「明日」を共に創る。' },
  ],
}

// 別サイトへのリンク。
// kintoneプラグイン配布サイトのURL。
// 空にすると、事業内容の「kintone pluginサイト」ボタンは押せない表示になります。
export const externalLinks = {
  kintonePluginSite: 'https://plugins.to-morrow.net/',
}

// 事業内容の各ボタンから開く説明ページ。
// public/ に置いた素のHTML（1ページ構成でルーターを入れていないため）。
export const detailPages = {
  // AI・IT伴走顧問と無料相談（旧 ai-sns.html / consulting.html はここへ転送）
  aiSupport: '/ai-support.html',
  // AI動画制作と動画内製化パッケージ
  video: '/video.html',
  website: '/website.html',
  system: '/system.html',
  // 料金表。プラグイン配布サイトのCTAからもここに来ます。
  services: '/services.html',
  // 帳票出力に特化した説明ページ（検索からの入口を兼ねています）
  reports: '/reports.html',
  support: '/support.html',
  terms: '/terms.html',
}

// 「to.Morrowとは」と「お問い合わせ」のページ。
// どちらも Vite の複数ページ機能で作っています（about/index.html・contact/index.html）。
export const pages = {
  about: '/about/',
  contact: '/contact/',
}

// サービスごとの申し込みページ（LP）。料金と無料試作の申し込みフォームがあります。
// public/advisor/・public/movie/・public/web/・public/kintone/ に置いています。
export const landingPages = {
  advisor: '/advisor/',
  video: '/movie/',
  website: '/web/',
  kintone: '/kintone/',
}

// お問い合わせフォームの送信先（Formspree）。
// Amplify は静的配信なので、サーバー側のプログラムは動きません。
// 外部のフォームサービスに送信しています。
// この値はビルド時にブラウザ側へ埋め込まれる公開情報です（秘密ではありません）。
// 環境変数 VITE_CONTACT_ENDPOINT を設定すると、そちらが優先されます。
export const contactEndpoint = 'https://formspree.io/f/meaqvnvy'

// ヘッダー・フッターのメニュー。
// トップ以外のページ（/about/・/contact/）からも使うので、「/」から始まるURLにしています。
export const navLinks = [
  { href: '/about/', label: 'to.Morrowとは' },
  { href: '/#services', label: '事業内容' },
  // 料金を先に見せることで、予算感の合わないお問い合わせを減らす狙いがあります
  { href: '/services.html', label: '料金' },
  { href: '/contact/', label: 'お問い合わせ' },
]

// トップと「to.Morrowとは」の「進め方」（3ステップ）。
// detail は「to.Morrowとは」ページで出す、少しくわしい説明です。
export const steps = [
  {
    no: '01',
    title: '集める',
    text: '今の業務と困りごとを洗い出します',
    detail:
      '今の仕事の流れと困りごとを、聞き取りで洗い出します。散らばったExcelや紙の記録、特定の人に頼っている作業を、一緒に見える形にします。',
  },
  {
    no: '02',
    title: '組み立てる',
    text: 'kintoneやAIで、業務の仕組みをつくります',
    detail:
      'kintoneやAIを使って、業務の仕組みをつくります。まずは成果が見えやすいところから、ひとつずつ置き換えていきます。',
  },
  {
    no: '03',
    title: '強くする',
    text: '使いながら改善し、社内で回せる人を育てます',
    detail:
      '使いながら改善し、社内で回せる人を育てます。つくって終わりにせず、現場の方が自分たちで仕組みを育てていける状態を目指します。',
  },
]

// SNS。href が空のものはフッターに表示されない（リンク切れを作らないため）。
// アカウントを作ったらURLを入れる。
export const snsLinks = [
  { href: '', label: 'X' },
  { href: '', label: 'LinkedIn' },
  { href: '', label: 'Instagram' },
]

export const footerLinks = [
  // いずれも public/ 直下の単独ページ（Reactを通しません）
  { href: '/services.html', label: '料金' },
  { href: '/support.html', label: 'サポート範囲' },
  { href: '/terms.html', label: 'プラグイン利用規約' },
  { href: '/privacy.html', label: 'プライバシーポリシー' },
]

// まだ公開していないセクションのスイッチ（true にすると表示されます）
//
// works / voices は、実際の案件・実際にいただいた声が揃うまで false のままにしてください。
// 架空の実績や推薦文を載せると景品表示法（優良誤認）の問題になります。
export const features = {
  works: false,
  voices: false,
}
