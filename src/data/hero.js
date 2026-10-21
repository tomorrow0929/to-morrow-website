// トップ（ヒーロー）で使うデータ。
// 画像は import して使うと、ビルド時に自動でファイル名が最適化されます。
import consultingBg from '../assets/images/consulting-bg.webp'
import developmentBg from '../assets/images/development-bg.webp'
import outsourcingBg from '../assets/images/outsourcing-bg.webp'
import { detailPages, pages } from './site.js'

// 背景でゆっくり切り替わる写真。
// caption は写真の右下に出る小さなラベルです。
// 増やしたいときは、このリストに足すだけで枚数に合わせて動きます。
export const heroSlides = [
  { id: 'advisor', image: outsourcingBg, caption: 'AI・IT伴走顧問' },
  { id: 'video', image: consultingBg, caption: 'AI動画制作・内製化' },
  { id: 'website', image: developmentBg, caption: 'Webサイト制作' },
]

// ヒーローのボタン
export const heroActions = [
  { id: 'contact', label: '無料で相談する', href: pages.contact, variant: 'primary' },
  { id: 'services', label: '事業内容を見る', href: '#services', variant: 'ghost' },
]

// 見出しの下に並ぶ数字。
// 実際に公開している事実だけを書いてください（盛ると景品表示法の問題になります）。
export const heroStats = [
  { id: 'plugins', value: '36', unit: '本', label: 'kintone無料プラグイン' },
  { id: 'estimate', value: '0', unit: '円', label: 'ご相談・お見積り' },
  { id: 'area', value: '全国', unit: '', label: 'オンラインで対応' },
]

// ヒーローの下を流れるキーワード帯。
// 「何ができる会社か」を一目で伝えるための飾りです。
export const marqueeItems = [
  'AI・IT伴走顧問',
  '無料相談',
  '生成AI活用',
  'AI講習',
  'AI動画制作',
  '動画内製化',
  '定型業務の自動化',
  '外注コスト削減',
  'Webサイト制作',
  'kintone無料プラグイン',
]

// 「無料相談」の下に出す一言（料金ページへの導線）
export const heroNote = { label: '料金・ご依頼メニューを見る', href: detailPages.services }
