// ファビコン画像(PNG/ICO)を public/favicon.svg のデザインから生成する使い捨てスクリプト
import zlib from 'node:zlib'
import fs from 'node:fs'

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
const crc32 = (buf) => {
  let c = 0xffffffff
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
const encodePNG = (size, rgba) => {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)
const SS = 4 // スーパーサンプリング倍率（アンチエイリアス用）

function render(size) {
  const s = size / 64
  const px = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let acc = [0, 0, 0, 0]
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const ux = (x + (sx + 0.5) / SS) / s
          const uy = (y + (sy + 0.5) / SS) / s
          acc = acc.map((v, i) => v + sample(ux, uy)[i])
        }
      }
      const n = SS * SS
      const o = (y * size + x) * 4
      for (let i = 0; i < 4; i++) px[o + i] = Math.round(acc[i] / n)
    }
  }
  return px
}

// 64x64 座標系で 1px を塗る色を返す（favicon.svg と同じ図形）
function sample(x, y) {
  let color = [0, 0, 0, 0]
  // 角丸長方形の背景 #01545a（r=12）
  const r = 12
  const cx = Math.min(Math.max(x, r), 64 - r)
  const cy = Math.min(Math.max(y, r), 64 - r)
  if (Math.hypot(x - cx, y - cy) <= r) color = [1, 84, 90, 255]
  if (color[3] === 0) return color

  // 光の輪（r=12 の細いリング）
  const dSun = Math.hypot(x - 32, y - 30)
  if (Math.abs(dSun - 12) <= 0.75) color = mix(color, [255, 213, 128, 255], 0.6)

  // 太陽（r=9 の放射グラデーション）
  if (dSun <= 9) {
    const t = dSun / 9
    color = [...mix([255, 222, 125], [255, 140, 66], t), 255]
  }

  // 地平線の波（stroke-width:4 → 中心から2px以内）
  const wy = 44 - 4 * Math.sin((2 * Math.PI * (x - 6)) / 52)
  if (x >= 6 && x <= 58 && Math.abs(y - wy) <= 2) {
    const t = Math.min(Math.max((x - 6) / 52, 0), 1)
    const stops = [
      [0.0, [0, 198, 255]], [0.35, [0, 174, 239]], [0.5, [255, 167, 92]],
      [0.7, [255, 140, 66]], [1.0, [255, 111, 0]],
    ]
    let c = stops[stops.length - 1][1]
    for (let i = 0; i < stops.length - 1; i++) {
      if (t >= stops[i][0] && t <= stops[i + 1][0]) {
        const k = (t - stops[i][0]) / (stops[i + 1][0] - stops[i][0])
        c = mix(stops[i][1], stops[i + 1][1], k)
        break
      }
    }
    color = [...c, 255]
  }
  return color
}

// --- PNG 出力 ---
for (const [name, size] of [['apple-touch-icon.png', 180], ['favicon-32x32.png', 32], ['favicon-192x192.png', 192], ['favicon-512x512.png', 512]]) {
  fs.writeFileSync(`public/${name}`, encodePNG(size, render(size)))
  console.log('wrote public/' + name)
}

// --- ICO 出力（16/32/48 の PNG を1ファイルにまとめる） ---
const icoSizes = [16, 32, 48]
const pngs = icoSizes.map((sz) => encodePNG(sz, render(sz)))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(icoSizes.length, 4)
let offset = 6 + 16 * icoSizes.length
const entries = icoSizes.map((sz, i) => {
  const e = Buffer.alloc(16)
  e[0] = sz === 256 ? 0 : sz; e[1] = sz === 256 ? 0 : sz
  e[2] = 0; e[3] = 0
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6)
  e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12)
  offset += pngs[i].length
  return e
})
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs]))
console.log('wrote public/favicon.ico')
