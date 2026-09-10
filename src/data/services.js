// 事業内容（トップページのカード）のデータ。
// 画像は import して使うと、ビルド時に自動でファイル名が最適化されます。
import consultingBg from '../assets/images/consulting-bg.png'
import developmentBg from '../assets/images/development-bg.png'
import outsourcingBg from '../assets/images/outsourcing-bg.png'
import dxSupport from '../assets/images/dx-support.png'
import itIntroduction from '../assets/images/it-introduction.png'
import itOperation from '../assets/images/it-operation.png'
import website from '../assets/images/website.png'
import systemTool from '../assets/images/system-tool.png'
import kintonePlugin from '../assets/images/kintone-plugin.png'

export const services = [
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
      { id: 'about-consulting', label: 'ITコンサルについて', variant: 'primary' },
      { id: 'free-consult', label: '無料相談', href: '#contact', variant: 'outline' },
    ],
  },
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
        action: { label: 'webサイトについて' },
      },
      {
        id: 'system',
        title: 'ITツール(システム)',
        description:
          'kintoneを利用した記録システムや、業務支援システムパックの開発をしております。独自にシステムを作りたい！というご要望に沿って開発致します。',
        image: systemTool,
        imageAlt: '業務システム開発のイメージ',
        action: { label: 'ITツールについて' },
      },
      {
        id: 'plugin',
        title: 'kintone plugin',
        description:
          'kintoneで使える便利なプラグインを無料で提供しております。またkintoneプラグイン開発依頼も承っております。',
        image: kintonePlugin,
        imageAlt: 'kintoneプラグインのイメージ',
        action: { label: 'kintone pluginサイト' },
      },
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
