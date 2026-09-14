// 事業内容（トップページのカード）のデータ。
// 画像は import して使うと、ビルド時に自動でファイル名が最適化されます。
import consultingBg from '../assets/images/consulting-bg.webp'
import developmentBg from '../assets/images/development-bg.webp'
import outsourcingBg from '../assets/images/outsourcing-bg.webp'
import dxSupport from '../assets/images/dx-support.webp'
import itIntroduction from '../assets/images/it-introduction.webp'
import itOperation from '../assets/images/it-operation.webp'
import website from '../assets/images/website.webp'
import systemTool from '../assets/images/system-tool.webp'
import kintonePlugin from '../assets/images/kintone-plugin.webp'
import { externalLinks, detailPages } from './site.js'

export const services = [
  {
    id: 'development',
    published: true,
    title: '開発',
    description: 'Webシステム/HP・業務システムの設計・開発を提供。',
    backgroundImage: developmentBg,
    itemVariant: 'featured', // 画像を背景いっぱいに敷くレイアウト
    items: [
      {
        id: 'web',
        title: 'webサイト',
        description:
          'webサイト、HPやLPを1から作成いたします。お客様のご要望に柔軟に対応した、独自のサイトをお作り致します。',
        image: website,
        imageAlt: 'Webサイト制作のイメージ',
        action: { label: 'webサイトについて', href: detailPages.website },
      },
      {
        id: 'system',
        title: 'ITツール(システム)',
        description:
          'kintoneを利用した記録システムや、業務支援システムパックの開発をしております。独自にシステムを作りたい！というご要望に沿って開発致します。',
        image: systemTool,
        imageAlt: '業務システム開発のイメージ',
        action: { label: 'ITツールについて', href: detailPages.system },
      },
      {
        id: 'plugin',
        title: 'kintone plugin',
        description:
          'kintoneで使える便利なプラグインを36本、すべて無料で公開しています（会員登録不要・利用期限なし）。帳票出力・Excel出力・ガントチャートなど。設定の代行やプラグイン開発のご依頼も承ります。',
        image: kintonePlugin,
        imageAlt: 'kintoneプラグインのイメージ',
        // URLが未設定のうちは href が付かず、ただのボタン表示になります
        action: {
          label: 'kintone pluginサイト',
          // URLが未設定なら href が付かず、押せないボタン表示になります
          href: externalLinks.kintonePluginSite || undefined,
          external: true, // 別サイトなので新しいタブで開く
        },
      },
    ],
    // 無料プラグインを見に来た方が、有料メニューにたどり着けるようにする導線。
    // 「帳票を出したい」という具体的な困りごとが最も多いため、先に帳票ページを置く。
    actions: [
      {
        id: 'reports',
        label: 'kintoneの帳票出力について',
        href: detailPages.reports,
        variant: 'primary',
      },
      { id: 'prices', label: '料金を見る', href: detailPages.services, variant: 'outline' },
    ],
  },
  {
    id: 'consulting',
    published: true,
    title: 'ITコンサルティング',
    description: 'DX支援・業務改善を通じて企業成長をサポートします。',
    backgroundImage: consultingBg,
    itemVariant: 'plain', // 画像を上に、文章を下に置く通常レイアウト
    items: [
      {
        id: 'dx',
        title: '社内DX推進支援',
        description: '社内におけるDX化を推進するための支援をさせていただいております。',
        image: dxSupport,
        imageAlt: '社内DX推進支援のイラスト',
      },
      {
        id: 'introduction',
        title: 'IT導入支援',
        description:
          '当方で開発したITシステムやその他のITシステムの導入のサポートをさせていただいております。',
        image: itIntroduction,
        imageAlt: 'IT導入支援のイラスト',
        tone: 'warm', // 背景色を少し暖色にする
      },
      {
        id: 'operation',
        title: 'IT運用支援',
        description: 'ITを導入した後の運用のサポートや修正対応をさせていただいております。',
        image: itOperation,
        imageAlt: 'IT運用支援のイラスト',
      },
    ],
    actions: [
      {
        id: 'about-consulting',
        label: 'ITコンサルについて',
        href: detailPages.consulting,
        variant: 'primary',
      },
      { id: 'free-consult', label: '無料相談', href: '#contact', variant: 'outline' },
    ],
  },
  {
    id: 'outsourcing',
    published: false, // 準備中。true にすると表示されます
    title: 'IT業務委託',
    description: '常駐・リモートを問わず、柔軟に業務支援を行います。',
    backgroundImage: outsourcingBg,
    itemVariant: 'plain',
    items: [
      {
        id: 'dx',
        title: '社内DX推進支援',
        description: '（準備中）',
        image: dxSupport,
        imageAlt: '社内DX推進支援のイラスト',
      },
      {
        id: 'introduction',
        title: 'IT導入支援',
        description: '（準備中）',
        image: itIntroduction,
        imageAlt: 'IT導入支援のイラスト',
      },
      {
        id: 'operation',
        title: 'IT運用支援',
        description: '（準備中）',
        image: itOperation,
        imageAlt: 'IT運用支援のイラスト',
      },
    ],
  },
]

// 実績。実際に手がけた案件が出たらここに追加してください。
// （中身が空のうちは src/data/site.js の features.works を false のままに）
export const works = []

// お客様の声。実際にいただいたコメントだけを、掲載許可を得た上で追加してください。
// （中身が空のうちは src/data/site.js の features.voices を false のままに）
export const voices = []
