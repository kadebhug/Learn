import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";

function crc32(buf) {
  let c = ~0;
  for (const byte of buf) {
    c ^= byte;
    for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function png(size, paint) {
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 4)] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = paint(x, y, size);
      const offset = y * (1 + size * 4) + 1 + x * 4;
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
      raw[offset + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([signature, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

function paint(x, y, size) {
  const radius = size * 0.22;
  const inside =
    x >= radius && x < size - radius
      ? y >= 0 && y < size
      : y >= radius && y < size - radius
        ? x >= 0 && x < size
        : [ [radius, radius], [size - radius, radius], [radius, size - radius], [size - radius, size - radius] ].some(
            ([cx, cy]) => (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2,
          );
  if (!inside) return [0, 0, 0, 0];
  const nx = x / size;
  const ny = y / size;
  const leaf =
    (nx - 0.42) ** 2 / 0.08 + (ny - 0.48) ** 2 / 0.16 < 1 ||
    (nx - 0.58) ** 2 / 0.07 + (ny - 0.42) ** 2 / 0.14 < 1;
  if (leaf) return [244, 255, 247, 255];
  return [14, 92, 52, 255];
}

mkdirSync("public/icons", { recursive: true });
for (const size of [192, 512]) {
  writeFileSync(`public/icons/icon-${size}.png`, png(size, paint));
}
console.log("icons written");
