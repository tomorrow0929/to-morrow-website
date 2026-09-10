/**
 * src/assets/images/ の PNG を WebP に変換して軽量化します。
 *
 * 元の PNG はそのまま残します（コードから import しなくなるので、
 * ビルド結果には含まれません＝配信されません）。
 * 差し替えをやり直したいときや、元画像を編集したいときに使えます。
 *
 *   npm run optimize-images
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const dir = path.resolve(import.meta.dirname, '../src/assets/images')

/**
 * 画像ごとの最大幅。
 * 画面上での実際の表示サイズに合わせて決めています
 * （表示より大きい画像を配信しても画質は上がらず、通信量だけ増えます）。
 */
const MAX_WIDTH = {
  // カード全体の背景に敷く画像。カード幅いっぱい＋高解像度ディスプレイを考慮
  'consulting-bg': 1600,
  'development-bg': 1600,
  'outsourcing-bg': 1600,
  // カード内の各項目の画像。表示は 250〜400px 程度
  'dx-support': 800,
  'it-introduction': 800,
  'it-operation': 800,
  'website': 800,
  'system-tool': 800,
  'kintone-plugin': 800,
}

const QUALITY = 80

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.png'))

let before = 0
let after = 0
const skipped = []

for (const file of files) {
  const name = path.basename(file, '.png')
  const maxWidth = MAX_WIDTH[name]

  if (!maxWidth) {
    skipped.push(file)
    continue
  }

  const src = path.join(dir, file)
  const dest = path.join(dir, `${name}.webp`)

  const meta = await sharp(src).metadata()
  const width = Math.min(meta.width, maxWidth)

  await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(dest)

  const b = fs.statSync(src).size
  const a = fs.statSync(dest).size
  before += b
  after += a

  console.log(
    `${name.padEnd(18)} ${(meta.width + 'px').padStart(7)} → ${(width + 'px').padStart(7)}   ` +
      `${(b / 1024 / 1024).toFixed(2).padStart(6)} MB → ${(a / 1024).toFixed(0).padStart(5)} KB`,
  )
}

console.log(
  `\n合計 ${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024 / 1024).toFixed(2)} MB ` +
    `(${Math.round((1 - after / before) * 100)}% 削減)`,
)

if (skipped.length > 0) {
  console.log(`\n対象外（MAX_WIDTH に未登録・コードから未使用）: ${skipped.join(', ')}`)
}
