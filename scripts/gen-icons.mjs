// Gera public/icon-192.png e icon-512.png sem dependências (PNG RGBA + zlib).
// Desenho: quadrado arredondado wine com um círculo cream (silhueta simples).
import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'

const WINE = [0xa8, 0x45, 0x5a], CREAM = [0xf6, 0xf1, 0xea]
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td))
  return Buffer.concat([len, td, crc])
}
function png(size) {
  const r = size * 0.22, cx = size / 2, cy = size * 0.42, cr = size * 0.17
  const raw = Buffer.alloc((size * 4 + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0
    for (let x = 0; x < size; x++) {
      const dx = Math.max(r - x, x - (size - 1 - r), 0), dy = Math.max(r - y, y - (size - 1 - r), 0)
      const inside = dx * dx + dy * dy <= r * r
      const head = (x - cx) ** 2 + (y - cy) ** 2 <= cr * cr
      const body = y > cy + cr * 0.9 && y < size * 0.82 && Math.abs(x - cx) < (y - cy) * 0.55
      const c = !inside ? [0, 0, 0, 0] : (head || body ? [...CREAM, 255] : [...WINE, 255])
      raw.set(c, y * (size * 4 + 1) + 1 + x * 4)
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])
}
for (const s of [180, 192, 512]) writeFileSync(new URL(`../public/icon-${s}.png`, import.meta.url), png(s))
console.log('icons ok')
