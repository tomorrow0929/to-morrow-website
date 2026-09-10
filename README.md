# to.Morrow ウェブサイト

IT事業「to.Morrow」のコーポレートサイト。

- 本番: https://main.d3k8o4bbbbo4ke.amplifyapp.com/
- リポジトリ: https://github.com/tomorrow0929/to-morrow-website
- ホスティング: AWS Amplify（`main` に push すると自動デプロイ）

> 法人（合同会社to.Morrow）は未設立。会社法7条で登記前は名称に「合同会社」を使えないため、
> サイト上は屋号「to.Morrow」で表記している。設立したら `src/data/site.js` の
> `company.name` と `profile`、`index.html` の `<title>`/OGP、`public/site.webmanifest` を直す。

---

## 何でできているか

| | |
| --- | --- |
| フレームワーク | React 18 |
| ビルド | Vite 6 |
| 言語 | JavaScript（JSX）。TypeScript は使っていない |
| スタイル | 素の CSS。コンポーネントごとに `.css` を並べて import |
| ルーティング | なし。1ページ構成で `#contact` のようなページ内リンクだけ |
| フォーム送信 | Formspree（静的サイトなのでサーバー処理は持てない） |

1ページ構成なので React Router は入れていない。Amplify 側の書き換えルールも不要。

---

## 開発

```bash
npm install     # 初回のみ
npm run dev     # http://localhost:5173/
```

`index.html` をダブルクリックしても表示されない（JSX の変換が必要なため）。
`file://` で開いたときはその旨の案内が出るようにしてある。

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー。保存すると自動でブラウザが更新される |
| `npm run build` | `dist/` に本番用ファイルを出力 |
| `npm run preview` | `dist/` をサーバー経由で確認 |
| `npm run favicons` | `public/favicon.svg` から ico / png を作り直す |
| `npm run optimize-images` | `src/assets/images/` の PNG を WebP に変換 |

---

## 構成

```
to.morrow_website/
├── index.html              <head>・ファビコン・SEO はここ
├── vite.config.js          base は '/'（Amplify はルート配信）
├── amplify.yml             Amplify のビルド設定。公開対象は dist
│
├── public/                 そのままの名前で公開される
│   ├── favicon.svg / .ico / favicon-32x32.png
│   ├── favicon-192x192.png / favicon-512x512.png
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── robots.txt
│   └── privacy.html        プライバシーポリシー（Reactを通さない単独ページ）
│
├── src/
│   ├── main.jsx            入口
│   ├── App.jsx             セクションを並べているだけ
│   │
│   ├── data/               ★ 文言はここに集約
│   │   ├── site.js             会社情報・ナビ・SNS・外部リンク・フォーム送信先
│   │   └── services.js         事業内容カード・実績・お客様の声
│   │
│   ├── components/         Header / Hero / Services / ServiceCard /
│   │                       ServiceCardItem / Works / Voices / About /
│   │                       Contact / Footer（各 .jsx + .css）
│   │
│   ├── hooks/
│   │   ├── useReveal.js        スクロールで要素をふわっと表示
│   │   └── useRecaptcha.js     reCAPTCHA v3（キー未設定なら何もしない）
│   │
│   ├── styles/
│   │   ├── variables.css       色・角丸。ここを変えると全体が変わる
│   │   ├── button.css          共通ボタン
│   │   └── base.css            上2つを import ＋ 全体の土台
│   │
│   └── assets/
│       ├── logo.svg
│       └── images/             .webp が本番用。元の .png も置いてある
│
└── tools/
    ├── generate-favicons.mjs
    └── optimize-images.mjs
```

### どこを直すか

| やりたいこと | ファイル |
| --- | --- |
| 屋号・住所・代表者名 | `src/data/site.js` |
| 事業内容の文章・画像 | `src/data/services.js` |
| ナビ・SNS・フッターリンク | `src/data/site.js` |
| 「実績」「お客様の声」を出す | `src/data/services.js` に中身を書いて `site.js` の `features` を `true` に |
| プラグイン配布サイトへのリンク | `src/data/site.js` の `externalLinks.kintonePluginSite` |
| 色 | `src/styles/variables.css` |
| ページタイトル・説明文 | `index.html` |
| ファビコン | `public/` の画像を差し替え |

---

## 画像

`src/assets/images/` に `.png`（元画像）と `.webp`（本番用）を置いている。
コードから import しているのは `.webp` だけなので、`.png` はビルド結果に含まれない。

もとは PNG のまま配信していて**トップページで約20MBあった**。WebP 化して 609KB になった。

新しい画像を入れたら:

1. PNG を `src/assets/images/` に置く
2. `tools/optimize-images.mjs` の `MAX_WIDTH` にファイル名と最大幅を追記
   （背景に敷くものは 1600px、カード内の項目画像は 800px）
3. `npm run optimize-images`
4. `src/data/services.js` の import を `.webp` に

---

## お問い合わせフォーム

Amplify のホスティングは静的配信なので、サーバー側のプログラムは動かせない。
Formspree に POST している。

送信先は `src/data/site.js`:

```js
export const contactEndpoint = 'https://formspree.io/f/meaqvnvy'
```

`VITE_` 変数はビルド時にブラウザ側へ埋め込まれる公開情報なので、環境変数にしても
秘匿性は上がらない。コード側で管理してバージョン管理に乗せている。
一時的に切り替えたいときだけ `.env` に `VITE_CONTACT_ENDPOINT` を書く。

- 届いた問い合わせ: https://formspree.io/forms
- 無料プランには月あたりの送信件数上限がある。増えてきたら確認する
- 送信内容は Formspree 側に保存される。この点はプライバシーポリシーに記載済み

---

## デプロイ

`main` に push すれば Amplify が自動でビルドして公開する。

```bash
git add .
git commit -m "..."
git push
```

進捗は Amplify コンソール（アプリID `d3k8o4bbbbo4ke`）で見る。

### ビルド設定

`amplify.yml` の `artifacts.baseDirectory: dist` が肝心。
これが無いと Amplify はビルドせずにソースをそのまま配信してしまい、
`index.html` が参照する `/src/main.jsx` が 404 になって**画面が真っ白になる**。

Amplify コンソール側に古いビルド設定が保存されていることがあり、そちらが
優先される場合がある。おかしいときは Hosting → Build settings を確認する。

---

## プライバシーポリシー

`public/privacy.html` に置いている。サイト本体は1ページ構成でルーターを
入れていないので、ここだけ素のHTMLにした（Amplify の書き換えルールも要らない）。
色は `src/styles/variables.css` と同じ値をインラインで持たせている。

フッターのリンクは `src/data/site.js` の `footerLinks` から。

外部サービス（Formspree / AWS Amplify）への言及と、国外移転についても書いてある。
アクセス解析を入れたら5章を書き直す。

**内容は自分で書いた事実ベースのもので、専門家のレビューは受けていない。**
事業内容が広がったら見直す。

---

## やること

- [x] Formspree でのテスト送信を確認（2026-09-10）
- [x] プライバシーポリシーを作成（2026-09-10）
- [ ] SNS アカウントを作ったら `src/data/site.js` の `snsLinks` にURLを入れる
      （`href` が空のものはフッターに表示されない）
- [ ] `index.html` の `canonical` を独自ドメインに（今は Amplify の URL）
- [ ] 法人設立後の名称・会社情報の差し替え
- [ ] 実績・お客様の声は**実際の案件・実際にいただいた声だけ**を載せる
      （架空の内容は景表法の優良誤認になる。お客様の声は掲載許可を取ってから）
