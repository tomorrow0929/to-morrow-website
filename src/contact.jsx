import React from 'react'
import ReactDOM from 'react-dom/client'
import ContactPage from './pages/ContactPage.jsx'
import './styles/base.css'

// contact/index.html の <div id="root"> にお問い合わせページを描画する入口
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactPage />
  </React.StrictMode>,
)
