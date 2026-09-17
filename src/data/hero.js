// トップ（ヒーロー）で使うデータ。
// 画像は import して使うと、ビルド時に自動でファイル名が最適化されます。
import consultingBg from '../assets/images/consulting-bg.webp'
import developmentBg from '../assets/images/development-bg.webp'
import outsourcingBg from '../assets/images/outsourcing-bg.webp'
import { detailPages } from './site.js'

// 背景でゆっくり切り替わる写真。
// caption は写真の右下に出る小さなラベルです。
// 増やしたいときは、このリストに足すだけで枚数に合わせて動きます。
export const heroSlides = [
  { id: 'consulting', image: consultingBg, caption: 'ITコンサルティング' },
  { id: 'development', image: developmentBg, caption: 'システム・Web開発' },
  { id: 'dx', image: outsourcingBg, caption: '社内DX推進支援' },
]

// ヒーローのボタン
export const heroActions = [
  { id: 'contact', label: '無料で相談する', href: '#contact', variant: 'primary' },
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
  'AI活用支援',
  'SNS運用代行',
  'kintone導入支援',
  '帳票出力',
  'Excel出力',
  '業務システム開発',
  '社内DX推進',
  'Webサイト制作',
  'プラグイン開発',
  'ガントチャート',
  '運用・保守サポート',
]

// 「無料相談」の下に出す一言（料金ページへの導線）
export const heroNote = { label: '料金・ご依頼メニューを見る', href: detailPages.services }
