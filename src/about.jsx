import React from 'react'
import ReactDOM from 'react-dom/client'
import AboutPage from './pages/AboutPage.jsx'
import './styles/base.css'

// about/index.html の <div id="root"> に「to.Morrowとは」ページを描画する入口
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AboutPage />
  </React.StrictMode>,
)
