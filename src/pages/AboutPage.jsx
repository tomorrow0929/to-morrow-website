import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Steps from '../components/Steps.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { company, landingPages, detailPages, externalLinks } from '../data/site.js'
import { useReveal } from '../hooks/useReveal.js'
import './AboutPage.css'

// 考え方（3つ）
const principles = [
  {
    title: '特定のAIに頼らない',
    text: '特定のAIに頼るのではなく、どのAIでも使いこなせる人を育てます。AIは毎月のように変わるので、道具よりも使う人の力を大切にしています。',
  },
  {
    title: '「判断」と「責任」',
    text: `${company.message}AIの答えを見極め、出したものに責任を持てる人を、社内に育てます。`,
  },
  {
    title: '成果を見せてから、定着させる',
    text: 'まず業務改善で成果を見せ、そのあと社員の方が使いこなせるように育成して、社内に定着させます。',
  },
]

// 提供サービスの一覧（各サービスのページへ）
const serviceLinks = [
  {
    title: 'AI・IT伴走顧問',
    text: 'AIとITの「これどうする？」を、いつでも相談できる月額の顧問です。',
    href: landingPages.advisor,
  },
  {
    title: 'kintoneシステム開発',
    text: 'kintoneの導入から、開発・保守、社内で作れるようになるまでをお手伝いします。',
    href: landingPages.kintone,
  },
  {
    title: 'AI動画制作・動画内製化',
    text: '撮影なしで、AIで企業CM・SNS動画をつくります。社内で作れるようになる支援もあります。',
    href: landingPages.video,
  },
  {
    title: 'Webサイト制作・運用',
    text: 'ホームページ・LPの制作と、公開後の更新・運用をお手伝いします。',
    href: landingPages.website,
  },
  {
    title: 'kintone無料プラグイン',
    text: 'kintoneで使えるプラグインを、無料で公開しています。',
    href: externalLinks.kintonePluginSite,
    external: true,
  },
  {
    title: '料金・ご依頼メニュー',
    text: 'サービスごとの料金をまとめています。',
    href: detailPages.services,
  },
]

// 代表プロフィール
// ※ 勤務先などの具体的な社名は書かない方針です。
const profile = {
  name: company.profile.find((row) => row.label === '代表')?.value ?? '今井 渓',
  career: [
    'kintoneのシステム開発（JavaScriptカスタマイズ・API連携）の実務経験',
    '介護・福祉業界の業務システム開発の経験',
    'AIの活用で、自身の作業時間を約3分の1に削減',
  ],
  // 【要確認】資格名が決まったら書き換えてください
  license: '【要確認：資格名】',
  message:
    '素材を集めて、強いものに仕上げていくのが好きです。業務の仕組みづくりも同じで、会社ごとに最適な形を作り上げます。',
}

export default function AboutPage() {
  const hero = useReveal(0)
  const mission = useReveal(0)
  const principle = useReveal(0)
  const service = useReveal(0)
  const person = useReveal(0)

  return (
    <>
      <Header />
      <main id="top">
        {/* ===== ページの見出し ===== */}
        <section className="page-intro" aria-labelledby="page-title">
          <div className={`container page-intro__inner ${hero.className}`} ref={hero.ref} style={hero.style}>
            <p className="eyebrow">About</p>
            <h1 id="page-title" className="page-intro__title">
              to.Morrowとは
            </h1>
            <p className="page-intro__lead">
              to.Morrowは、広島でAIとITを使って、中小企業の「業務の土台」をつくる個人事業です。
            </p>
          </div>
        </section>

        {/* ===== 私たちが目指すこと ===== */}
        <section className="section about-page__mission" aria-labelledby="mission-title">
          <div className={`container about-page__narrow ${mission.className}`} ref={mission.ref} style={mission.style}>
            <h2 id="mission-title" className="section-title">
              私たちが目指すこと
            </h2>
            <p className="about-page__mission-text">
              会社の業務の土台を強くし、社内で育てていける状態をつくる。
            </p>
            <p className="about-page__body">
              散らばったExcel、紙の記録、特定の人に頼りきりの作業を、ひとつずつ仕組みに置き換えていきます。つくって終わりにはせず、現場の方が自分たちで仕組みを育てていけるところまでお手伝いします。
            </p>
          </div>
        </section>

        {/* ===== 考え方 ===== */}
        <section className="section about-page__principles" aria-labelledby="principles-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Policy</p>
              <h2 id="principles-title" className="section-title">
                考え方
              </h2>
            </div>
            <ol className={`about-page__cards ${principle.className}`} ref={principle.ref} style={principle.style}>
              {principles.map((item, index) => (
                <li className="about-page__card" key={item.title}>
                  <span className="about-page__card-no" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="about-page__card-title">{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== 進め方（トップの3ステップを詳しく） ===== */}
        <Steps detailed headingId="about-steps-title" />

        {/* ===== 提供サービス ===== */}
        <section className="section about-page__services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Services</p>
              <h2 id="services-title" className="section-title">
                提供サービス
              </h2>
            </div>
            <ul className={`about-page__links ${service.className}`} ref={service.ref} style={service.style}>
              {serviceLinks.map((item) => (
                <li key={item.title}>
                  <a
                    className="about-page__link"
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <h3 className="about-page__link-title">{item.title}</h3>
                    <p>{item.text}</p>
                    <span className="about-page__link-more" aria-hidden="true">
                      くわしく見る →
                    </span>
                    {item.external && <span className="visually-hidden">（新しいタブで開きます）</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== 代表プロフィール ===== */}
        <section className="section about-page__profile" aria-labelledby="profile-title">
          <div className={`container about-page__narrow ${person.className}`} ref={person.ref} style={person.style}>
            <h2 id="profile-title" className="section-title">
              代表プロフィール
            </h2>
            <div className="about-page__person">
              <p className="about-page__person-role">代表</p>
              <p className="about-page__person-name">{profile.name}</p>
              <ul className="about-page__career">
                {profile.career.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <dl className="about-page__license">
                <dt>保有資格</dt>
                <dd>{profile.license}</dd>
              </dl>
              <blockquote className="about-page__message">
                <p>{profile.message}</p>
              </blockquote>
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
