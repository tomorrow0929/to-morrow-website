// 事業内容（トップページのカード）のデータ。
// 画像は import して使うと、ビルド時に自動でファイル名が最適化されます。
import consultingBg from '../assets/images/consulting-bg.webp'
import developmentBg from '../assets/images/development-bg.webp'
import website from '../assets/images/website.webp'
import systemTool from '../assets/images/system-tool.webp'
import kintonePlugin from '../assets/images/kintone-plugin.webp'
// 背景は自作のSVG（ai-sns-bg.svg）から書き出したもの
import aiSnsBg from '../assets/images/ai-sns-bg.webp'
import aiSupport from '../assets/images/ai-support.webp'
// 伴走顧問・動画の3枚は ChatGPT で作成した画像（人物の顔は写さない方針）
import advisor from '../assets/images/advisor.webp'
import videoProduction from '../assets/images/video-production.webp'
import videoInhouse from '../assets/images/video-inhouse.webp'
import { externalLinks, detailPages, landingPages } from './site.js'

// 並び順がそのまま表示順（01, 02 …）になります。
export const services = [
  {
    // 入口の無料相談と、継続の顧問をひとまとめにしている
    id: 'ai-support',
    published: true,
    title: 'AI・IT伴走顧問',
    description:
      '特定のAIに頼るのではなく、どのAIでも成果を出せる「使いこなせる人」を社内に育てます。',
    backgroundImage: aiSnsBg,
    itemVariant: 'featured', // 写真を背景いっぱいに敷く
    items: [
      {
        id: 'free-consult',
        title: '無料相談',
        description:
          '30〜60分、オンラインまたは対面で。お困りごとを1つ、その場でAIを使って実際に解決してみせます。',
        image: aiSupport,
        imageAlt: '無料相談のイメージ',
        // 顧問LPの無料相談の申し込みフォームへ
        action: { label: '無料相談について', href: `${landingPages.advisor}#contact` },
      },
      {
        id: 'advisor',
        title: 'AI・IT伴走顧問（月額）',
        description:
          'いつでも相談できる土台に、講習やIT運用を必要に応じて足していきます。AIは常に変わるので、ゴールを更新しながら継続して伴走します。',
        image: advisor,
        imageAlt: 'AI・IT伴走顧問のイメージ',
        // 顧問LP（できること・料金）へ
        action: { label: '伴走顧問について', href: landingPages.advisor },
      },
    ],
    actions: [
      { id: 'free-consult-ai', label: '無料で相談する', href: '#contact', variant: 'primary' },
      { id: 'prices-ai', label: '料金を見る', href: detailPages.services, variant: 'outline' },
    ],
  },
  {
    id: 'video',
    published: true,
    title: 'AI動画制作・動画内製化',
    description: '企業紹介やSNS用の動画をAIで制作します。社内で作れるようになる支援も行います。',
    backgroundImage: consultingBg,
    itemVariant: 'featured',
    items: [
      {
        id: 'video-production',
        title: 'AI動画制作',
        description:
          '初めてのお客様は無料で試作し、気に入っていただけたらご購入いただく形です。購入後の修正は2回まで無料です。',
        image: videoProduction,
        imageAlt: 'AI動画制作のイメージ',
        // 動画LP（料金と無料試作の申し込み）へ
        action: { label: '動画制作について', href: landingPages.video },
      },
      {
        id: 'video-inhouse',
        title: '動画内製化パッケージ',
        description:
          '手順書とハンズオン、添削を通して、今後動画を外注しなくて済むように社内で作れる体制をつくります。',
        image: videoInhouse,
        imageAlt: '動画内製化パッケージのイメージ',
        // 動画LPの「動画内製化パッケージ」の料金のところへ
        action: { label: '内製化パッケージについて', href: `${landingPages.video}#inhouse` },
      },
    ],
    actions: [
      { id: 'video-trial', label: '無料試作を相談する', href: '#contact', variant: 'primary' },
    ],
  },
  {
    id: 'website',
    published: true,
    title: 'Webサイト制作',
    description: 'HPやLPを1から作成します。',
    backgroundImage: developmentBg,
    itemVariant: 'featured',
    items: [
      {
        id: 'web',
        title: 'Webサイト・LP',
        description:
          'お客様のご要望に柔軟に対応した、独自のサイトをお作りします。料金は内容をお聞きしたうえで個別にお見積りします。',
        image: website,
        imageAlt: 'Webサイト制作のイメージ',
        // Web制作LP（料金と無料試作の申し込み）へ
        action: { label: 'Webサイト制作について', href: landingPages.website },
      },
    ],
  },
  {
    id: 'kintone',
    published: true,
    title: 'kintone',
    description: 'kintoneで使えるプラグインを無料で公開しています。',
    backgroundImage: developmentBg,
    itemVariant: 'featured',
    items: [
      {
        id: 'plugin',
        title: 'kintone 無料プラグイン',
        description:
          'kintoneで使える便利なプラグインを36本、すべて無料で公開しています（会員登録不要・利用期限なし）。帳票出力・Excel出力・ガントチャートなど。',
        image: kintonePlugin,
        imageAlt: 'kintoneプラグインのイメージ',
        action: {
          label: 'kintone pluginサイト',
          // URLが未設定なら href が付かず、押せないボタン表示になります
          href: externalLinks.kintonePluginSite || undefined,
          external: true, // 別サイトなので新しいタブで開く
        },
      },
      {
        id: 'paid',
        title: 'kintone 有料メニュー',
        description: '現在準備中です。受付開始までしばらくお待ちください。',
        image: systemTool,
        imageAlt: 'kintone有料メニューのイメージ',
        // href を付けないので、押せない「準備中」ボタンとして表示されます
        action: { label: '準備中' },
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
