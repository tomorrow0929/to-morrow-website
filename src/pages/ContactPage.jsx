import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Contact from '../components/Contact.jsx'
import './ContactPage.css'

/**
 * お問い合わせページ（/contact/）。
 * フォームの中身と送信の仕組みは、トップにあったときと同じ Contact コンポーネントです。
 * このページではフォームの見出しがページの見出しになるので h1 にします。
 */
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="top" className="contact-page">
        <Contact headingLevel="h1" notice="無料相談（30〜60分）も受け付けています" />
      </main>
      <Footer />
    </>
  )
}
