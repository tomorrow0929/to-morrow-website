# to.Morrow ウェブサイト

IT事業「to.Morrow」のWebサイトです。

> **メモ:** 法人（合同会社to.Morrow）はまだ設立していません。
> 登記が済むまでは屋号「to.Morrow」として表記しています（会社法7条）。
> 設立後は `src/data/site.js` の `company.name` と `profile` を書き換えてください。

**React + Vite** で作られており、GitHub Pages に自動で公開されます。

---

## 1. 必要なもの

- [Node.js](https://nodejs.org/ja) の LTS 版（20 以上。推奨 22）

インストールできているか確認するには、ターミナル（PowerShell）で:

```bash
node -v
npm -v
```

---

## 2. 最初のセットアップ（1回だけ）

```bash
# このフォルダで実行します
npm install
```

`node_modules` フォルダができます。これは自動生成されるので Git には入れません。

続けて、環境変数ファイルを用意します。

```bash
cp .env.example .env
```

`.env` を開いて、お問い合わせフォームの送信先などを設定してください（→ 5章）。

---

## 3. 開発するとき

```bash
npm run dev
```

表示された `http://localhost:5173/` をブラウザで開くと、サイトが見られます。
**ファイルを保存すると、ブラウザが自動で更新されます。**

止めるときは、ターミナルで `Ctrl + C`。

---

## 4. フォルダ構成

```
to.morrow_website/
├── index.html              ← ページの土台（<head>・ファビコン・SEO設定はここ）
├── package.json            ← 使うライブラリと npm コマンドの一覧
├── vite.config.js          ← ビルド設定
├── .env.example            ← 環境変数のひな形（コピーして .env を作る）
│
├── public/                 ← そのままの名前で公開されるファイル置き場
│   ├── favicon.svg             ファビコン（新しいブラウザ用）
│   ├── favicon.ico             ファビコン（古いブラウザ用）
│   ├── favicon-32x32.png
│   ├── favicon-192x192.png
│   ├── favicon-512x512.png
│   ├── apple-touch-icon.png    iPhoneでホーム画面に追加したときのアイコン
│   ├── site.webmanifest        アプリ情報（アイコン・テーマカラー）
│   └── robots.txt              検索エンジン向けの設定
│
├── src/                    ← サイトの中身（ここを編集していきます）
│   ├── main.jsx                アプリの入口
│   ├── App.jsx                 ページ全体の組み立て
│   │
│   ├── components/             画面の部品（1部品 = .jsx + .css のセット）
│   │   ├── Header.jsx / Header.css
│   │   ├── Hero.jsx  / Hero.css
│   │   ├── Services.jsx / ServiceCard.jsx / ServiceCardItem.jsx / Services.css
│   │   ├── Works.jsx / Works.css
│   │   ├── Voices.jsx / Voices.css
│   │   ├── About.jsx / About.css
│   │   ├── Contact.jsx / Contact.css
│   │   └── Footer.jsx / Footer.css
│   │
│   ├── data/                   文章・リンクなどのデータ
│   │   ├── site.js                 会社情報・ナビ・公開スイッチ
│   │   └── services.js             事業内容・実績・お客様の声
│   │
│   ├── hooks/                  複数の部品で使い回す処理
│   │   ├── useReveal.js            スクロールで要素をふわっと表示
│   │   └── useRecaptcha.js         reCAPTCHA v3
│   │
│   ├── styles/                 サイト全体のスタイル
│   │   ├── base.css                共通の土台
│   │   ├── variables.css           色・角丸などの設定値
│   │   └── button.css              共通ボタン
│   │
│   └── assets/                 画像（import して使う）
│       ├── logo.svg
│       └── images/*.png
│
├── tools/
│   └── generate-favicons.mjs   ファビコン画像を作り直すスクリプト
│
├── .github/workflows/
│   └── deploy.yml              GitHub Pages への自動公開設定
│
└── dist/                       ビルド結果（自動生成。Gitには入れません）
```

### どこを直せばいい？

| やりたいこと | 編集するファイル |
| --- | --- |
| 屋号・住所・代表者名を変える | `src/data/site.js` |
| 事業内容の文章や画像を変える | `src/data/services.js` |
| ナビゲーション／SNSリンクを変える | `src/data/site.js` |
| 「実績」「お客様の声」を公開する | `src/data/services.js` に中身を書いてから `src/data/site.js` の `features` を `true` に |
| 「IT業務委託」カードを公開する | `src/data/services.js` の `published` を `true` に |
| 色を変える | `src/styles/variables.css` |
| ページのタイトル・説明文（SEO） | `index.html` |
| ファビコンを差し替える | `public/` の中の画像を入れ替え |

---

## 5. ファビコンについて

`public/` の中のファイルを差し替えるだけで変わります。
デザインを変えたい場合は `public/favicon.svg` を編集し、次を実行すると
png / ico がまとめて作り直されます。

```bash
npm run favicons
```

※ このスクリプトは `tools/generate-favicons.mjs` の中に図形を直接書いています。
　 自作の画像に差し替えたい場合は、[RealFaviconGenerator](https://realfavicongenerator.net/)
　 などで作った画像を `public/` に置き換えてもかまいません。

---

## 6. お問い合わせフォームの送信先

**GitHub Pages は静的サイトなので、サーバー側のプログラム（`/api/contact`）は動きません。**
外部のフォームサービスを使ってください。

1. [Formspree](https://formspree.io/) などでフォームを作り、送信先URLを取得
2. `.env` に設定

```
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
VITE_RECAPTCHA_SITE_KEY=
```

3. GitHub でも同じ値を登録
   リポジトリ → Settings → Secrets and variables → Actions → New repository secret
   - Name: `VITE_CONTACT_ENDPOINT` / Value: 上記URL

`VITE_` で始まる変数は**ブラウザから見える**ので、パスワードなど秘密の値は入れないでください。

---

## 7. 公開する（GitHub Pages）

### 最初の1回だけ

1. GitHub にリポジトリを作り、このフォルダを push
2. リポジトリ → **Settings** → **Pages** →
   「Build and deployment」の **Source** を **GitHub Actions** に変更

### 2回目以降

`main` ブランチに push するだけで、自動でビルド＆公開されます。

```bash
git add .
git commit -m "サイトを更新"
git push
```

進捗は GitHub の **Actions** タブで確認できます。

### 手元で完成品を確認したいとき

```bash
npm run build     # dist フォルダに完成品ができる
npm run preview   # dist を実際のサーバーのように表示して確認
```

---

## 8. 今後の改善メモ

- **画像が重い（合計約20MB）**。トップページの表示が遅くなります。
  PNG → WebP に変換し、幅1600px程度にリサイズすると 1/10 以下になります。
- `index.html` の `canonical` URL を、公開後の実際のURLに書き換える。
- フッターの「プライバシーポリシー」「SNS」のリンク先が未設定（`#`）。

### 法人を設立したらやること

- `src/data/site.js` の `company.name` を「合同会社to.Morrow」に変更
- 同ファイルの `profile` で「屋号」→「社名」に変更し、「設立」の行（実際の登記日）を追加
- `index.html` の `<title>` と OGP、`public/site.webmanifest` の `name` も合わせて変更

### 実績・お客様の声を載せるとき

必ず**実際に手がけた案件・実際にいただいた声**だけを載せてください。
架空の実績や推薦文は景品表示法（優良誤認）の問題になります。
お客様の声は、掲載の許可を得てから載せてください。
