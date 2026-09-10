// サイト全体の基本情報。文言の修正はこのファイルだけで完結します。

export const company = {
  name: '合同会社to.Morrow',
  tagline: '明日を創る。',
  lead: 'ITで次の一歩を支援する、信頼のパートナー',
  profile: [
    { label: '社名', value: '合同会社to.Morrow' },
    { label: '設立', value: '2023年4月' },
    { label: '所在地', value: '広島県広島市西区高須台3-2-12' },
    { label: '代表', value: '今井 渓' },
    { label: '理念', value: 'ITの力で「明日」を共に創る。' },
  ],
}

export const navLinks = [
  { href: '#about', label: '会社情報' },
  { href: '#services', label: '事業内容' },
  { href: '#contact', label: 'お問い合わせ' },
]

export const snsLinks = [
  { href: '#', label: 'X' },
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Instagram' },
]

export const footerLinks = [
  { href: '#', label: 'プライバシーポリシー' },
  { href: '#', label: '採用情報' },
]

// まだ公開していないセクションのスイッチ（true にすると表示されます）
export const features = {
  works: false,
  voices: false,
}
