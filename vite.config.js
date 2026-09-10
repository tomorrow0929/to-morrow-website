import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // サイトを配信する基準パス。
  // AWS Amplify はドメインのルート（https://〜/）で配信するので '/' が正解です。
  // ここを './' にすると、Vite が index.html 内のパスも相対に書き換えるため、
  // 下の階層のURLを開いたときにファビコンなどが見つからなくなります。
  //
  // ※ もし「https://example.com/site/」のようにサブディレクトリで公開する場合は、
  //    ここを '/site/' に変更してください。
  base: '/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
