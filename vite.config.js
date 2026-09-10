import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // './' にしておくと、GitHub Pages のプロジェクトページ
  // (https://<ユーザー名>.github.io/<リポジトリ名>/) でも
  // 独自ドメインでも、そのまま動きます。
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
