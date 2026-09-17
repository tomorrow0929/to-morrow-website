// サイト全体の基本情報。文言の修正はこのファイルだけで完結します。

export const company = {
  // 屋号（個人事業）。法人を設立したら「合同会社to.Morrow」に変更してください。
  // ※ 会社法7条により、法人登記が済むまで名称に「合同会社」は使えません。
  name: 'to.Morrow',
  tagline: '明日を創る。',
  lead: 'ITで次の一歩を支援する、信頼のパートナー',
  profile: [
    { label: '屋号', value: 'to.Morrow' },
    { label: '所在地', value: '広島県広島市西区' },
    { label: '代表', value: '今井 渓' },
    { label: '事業内容', value: 'AI活用支援 / SNS運用代行 / ITコンサルティング / システム・Webサイト開発' },
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
  aiSns: '/ai-sns.html',
  consulting: '/consulting.html',
  website: '/website.html',
  system: '/system.html',
  // 有料メニューの料金表。プラグイン配布サイトのCTAからもここに来ます。
  services: '/services.html',
  // 帳票出力に特化した説明ページ（検索からの入口を兼ねています）
  reports: '/reports.html',
  support: '/support.html',
  terms: '/terms.html',
}

// お問い合わせフォームの送信先（Formspree）。
// Amplify は静的配信なので、サーバー側のプログラムは動きません。
// 外部のフォームサービスに送信しています。
// この値はビルド時にブラウザ側へ埋め込まれる公開情報です（秘密ではありません）。
// 環境変数 VITE_CONTACT_ENDPOINT を設定すると、そちらが優先されます。
export const contactEndpoint = 'https://formspree.io/f/meaqvnvy'

export const navLinks = [
  { href: '#about', label: '事業者情報' },
  { href: '#services', label: '事業内容' },
  // 料金を先に見せることで、予算感の合わないお問い合わせを減らす狙いがあります
  { href: '/services.html', label: '料金' },
  { href: '#contact', label: 'お問い合わせ' },
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
