/**
 * generate-fieldnotes-manifest.js — regenerate the Field Notes manifest
 * (LEGACY / UNSAFE). Wired to `npm run generate:fieldnotes`.
 *
 * Moves pending images from public/field-notes-not-added into
 * public/field-notes/<country>/ (SLUGIFYING filenames), reads each image's pixel
 * dimensions with a hand-rolled PNG/JPEG/WEBP parser, and writes BOTH
 * public/field-notes/manifest.json and lib/field-notes-data.json — seeded from a
 * hardcoded `existingPhotos` list, with generic "A moment from <country>."
 * observations and dates taken from file mtime.
 *
 * ⚠ DO NOT RUN against the current data. The `existingPhotos` seed below is
 * STALE (references files that no longer exist, e.g. ireland-leap-castle.jpg);
 * running this renames files away from the current "Country Descriptor.jpg"
 * convention, overwrites the hand-curated manifest (locations, observations,
 * dates, order), ignores EXIF orientation, and regenerates the dead
 * lib/field-notes-data.json.
 *
 * The current workflow (resize to a 2560px cap + sharp-derived, EXIF-correct
 * dimensions + manual manifest edits) is documented in AGENTS.md. This file and
 * the `generate:fieldnotes` script are kept only for historical reference.
 */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const projectRoot = process.cwd()
const publicRoot = path.join(projectRoot, 'public')
const fieldNotesRoot = path.join(publicRoot, 'field-notes')
const notAddedRoot = path.join(publicRoot, 'field-notes-not-added')
const manifestPath = path.join(fieldNotesRoot, 'manifest.json')
const sourceJsonPath = path.join(projectRoot, 'lib', 'field-notes-data.json')

// STALE hardcoded seed prepended to every generated manifest. Most of these
// paths no longer exist on disk — a key reason this script must not be run.
const existingPhotos = [
  {
    id: 'leap-castle',
    src: '/field-notes/ireland/ireland-leap-castle.jpg',
    alt: 'A medieval stone castle ruin under a clear blue sky with rooks circling the keep',
    location: 'Leap Castle',
    place: 'County Offaly, Ireland',
    month: 'April',
    year: '2023',
    observation: 'Rooks turning over the keep on a rare cloudless morning.',
    width: 1080,
    height: 1320,
  },
  {
    id: 'kuang-si',
    src: '/field-notes/laos/laos-waterfall.jpg',
    alt: 'A turquoise multi-tiered waterfall surrounded by lush green jungle',
    location: 'Kuang Si Falls',
    place: 'Luang Prabang, Laos',
    month: 'December',
    year: '2022',
    observation: 'Meltwater stepping down through pools the colour of jade.',
    width: 1080,
    height: 1150,
  },
  {
    id: 'teotihuacan',
    src: '/field-notes/mexico/mexico-teotihuacan-balloons.jpg',
    alt: 'Dozens of hot air balloons drifting over the Pyramid of the Sun at Teotihuacán in golden sunrise haze',
    location: 'Teotihuacán',
    place: 'San Juan Teotihuacán, Mexico',
    month: 'October',
    year: '2023',
    observation: 'A whole sky of balloons lifting off as the sun cleared the pyramids.',
    width: 6112,
    height: 6112,
  },
  {
    id: 'reykjanes-aurora',
    src: '/field-notes/iceland/iceland-aurora-1.webp',
    alt: 'Vivid green and yellow aurora swirling above dark horizon clouds',
    location: 'Reykjanes Peninsula',
    place: 'Iceland',
    month: 'March',
    year: '2023',
    observation: 'The sky caught fire green a little after midnight.',
    width: 1080,
    height: 1080,
  },
  {
    id: 'aurlandsfjord',
    src: '/field-notes/norway/norway-fjord.jpg',
    alt: 'Snow-capped mountains and forest reflected in a still fjord under a low sun',
    location: 'Aurlandsfjord',
    place: 'Western Norway',
    month: 'January',
    year: '2023',
    observation: 'Still water holding the mountains upside down.',
    width: 1080,
    height: 1350,
  },
  {
    id: 'lake-hawea',
    src: '/field-notes/new-zealand/new-zealand-lake-hawea.jpg',
    alt: 'Purple and orange wildflowers in the foreground with a turquoise alpine lake and bare mountains beyond',
    location: 'Lake Hāwea',
    place: 'Otago, New Zealand',
    month: 'January',
    year: '2024',
    observation: 'Wildflowers running right down to impossibly blue water.',
    width: 6112,
    height: 6112,
  },
  {
    id: 'hang-mua',
    src: '/field-notes/vietnam/vietnam-mountain-view.jpg',
    alt: 'Aerial view over flooded rice paddies, karst hills, and a distant town',
    location: 'Hang Múa',
    place: 'Ninh Bình, Vietnam',
    month: 'February',
    year: '2023',
    observation: 'Flooded rice terraces seen from the last step up.',
    width: 1080,
    height: 1080,
  },
  {
    id: 'amager-faelled',
    src: '/field-notes/denmark/copenhagen-forced-perspective.jpg',
    alt: 'A corridor of slender bare beech trunks receding into the distance',
    location: 'Amager Fælled',
    place: 'Copenhagen, Denmark',
    month: 'November',
    year: '2022',
    observation: 'A corridor of beech trunks folding into forced perspective.',
    width: 1080,
    height: 566,
  },
  {
    id: 'jokulsarlon',
    src: '/field-notes/iceland/iceland-glacier.webp',
    alt: 'Icebergs grounded on a black pebble shore at a glacier lagoon',
    location: 'Jökulsárlón',
    place: 'Iceland',
    month: 'March',
    year: '2023',
    observation: 'Icebergs run aground on a black pebble shore.',
    width: 1080,
    height: 1080,
  },
  {
    id: 'cau-vang',
    src: '/field-notes/vietnam/vietnam-hands-bridge.jpg',
    alt: 'Golden pedestrian bridge held aloft by two giant weathered stone hands',
    location: 'Cầu Vàng',
    place: 'Bà Nà Hills, Vietnam',
    month: 'February',
    year: '2023',
    observation: 'The Golden Bridge held up by two weathered hands.',
    width: 1080,
    height: 1080,
  },
  {
    id: 'hallstatt',
    src: '/field-notes/austria/austria-hallstatt.jpg',
    alt: 'A lakeside alpine village with a church spire reflected in still water below steep wooded mountains at dusk',
    location: 'Hallstatt',
    place: 'Upper Austria, Austria',
    month: 'October',
    year: '2023',
    observation: 'The whole village holding its breath on the lake at blue hour.',
    width: 4000,
    height: 4000,
  },
  {
    id: 'vik-aurora',
    src: '/field-notes/iceland/iceland-aurora-2.webp',
    alt: 'Green aurora streaks across a starry, partly cloudy night sky',
    location: 'Vík í Mýrdal',
    place: 'Iceland',
    month: 'March',
    year: '2023',
    observation: 'Green light and a single bright star over the cloud.',
    width: 1080,
    height: 1080,
  },
  {
    id: 'norreport',
    src: '/field-notes/denmark/copenhagen-subway.jpg',
    alt: 'A brutalist concrete stairwell rising toward bright daylight',
    location: 'Nørreport',
    place: 'Copenhagen, Denmark',
    month: 'November',
    year: '2022',
    observation: 'Brutalist concrete and a stair toward daylight.',
    width: 1080,
    height: 566,
  },
  {
    id: 'ponta-sao-lourenco',
    src: '/field-notes/portugal/portugal-madeira-trail.jpg',
    alt: 'A lone hiker on a narrow ridge trail above the sea with sunlight glinting off the water at golden hour',
    location: 'Ponta de São Lourenço',
    place: 'Madeira, Portugal',
    month: 'September',
    year: '2023',
    observation: 'One walker, one trail, and the Atlantic catching the last light.',
    width: 959,
    height: 959,
  },
]

const countryMap = {
  'usa': {slug: 'usa', display: 'United States'},
  'us': {slug: 'usa', display: 'United States'},
  'united states': {slug: 'usa', display: 'United States'},
  'united states of america': {slug: 'usa', display: 'United States'},
  'austria': {slug: 'austria', display: 'Austria'},
  'laos': {slug: 'laos', display: 'Laos'},
  'mexico': {slug: 'mexico', display: 'Mexico'},
  'iceland': {slug: 'iceland', display: 'Iceland'},
  'norway': {slug: 'norway', display: 'Norway'},
  'new zealand': {slug: 'new-zealand', display: 'New Zealand'},
  'portugal': {slug: 'portugal', display: 'Portugal'},
  'vietnam': {slug: 'vietnam', display: 'Vietnam'},
  'bolivia': {slug: 'bolivia', display: 'Bolivia'},
  'liechtenstein': {slug: 'liechtenstein', display: 'Liechtenstein'},
  'aruba': {slug: 'aruba', display: 'Aruba'},
  'ireland': {slug: 'ireland', display: 'Ireland'},
  'new': {slug: 'new-zealand', display: 'New Zealand'},
  'copenhagen': {slug: 'denmark', display: 'Denmark'},
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function titleCase(value) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b[a-z]/g, (char) => char.toUpperCase())
}

// Intrinsic (width, height) from PNG/JPEG/WEBP headers, parsed by hand to avoid
// an image dependency. Ignores EXIF orientation; falls back to 1000x1000.
function readImageSize(filePath) {
  const buffer = fs.readFileSync(filePath)
  if (buffer.slice(0, 8).toString('ascii') === '\u0089PNG\r\n\x1a\n') {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    }
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break
      const marker = buffer[offset + 1]
      const size = buffer.readUInt16BE(offset + 2)
      if (marker >= 0xc0 && marker <= 0xc3) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        }
      }
      offset += 2 + size
    }
  }
  if (buffer.slice(0, 4).toString('ascii') === 'RIFF' && buffer.slice(8, 12).toString('ascii') === 'WEBP') {
    const chunk = buffer.slice(12, 16).toString('ascii')
    if (chunk === 'VP8X') {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      }
    }
    if (chunk === 'VP8 ') {
      return {
        width: buffer.readUInt16LE(26),
        height: buffer.readUInt16LE(28),
      }
    }
    if (chunk === 'VP8L') {
      const b0 = buffer[21]
      const b1 = buffer[22]
      const b2 = buffer[23]
      const b3 = buffer[24]
      return {
        width: ((b1 & 0x3f) << 8) | b0 + 1,
        height: ((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6) + 1,
      }
    }
  }
  return {width: 1000, height: 1000}
}

function monthName(date) {
  return date.toLocaleString('en-US', { month: 'long' })
}

function fileHash(filePath) {
  const buffer = fs.readFileSync(filePath)
  return crypto.createHash('sha1').update(buffer).digest('hex')
}

function listFiles(root) {
  if (!fs.existsSync(root)) return []
  return fs.readdirSync(root).filter((fn) => !fn.endsWith('Zone.Identifier')).map((fn) => path.join(root, fn))
}

function walkDir(dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir)) {
    if (entry.endsWith('Zone.Identifier')) continue
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) {
      results.push(...walkDir(full))
    } else {
      results.push(full)
    }
  }
  return results
}

// Infer a country {slug, display} from the leading word(s) of a filename,
// trying a two-word match first (e.g. "new zealand") then a single word.
function getCountryFromName(name) {
  const lower = name.toLowerCase()
  const tokens = lower.split(/\s+/)
  if (tokens.length >= 2) {
    const firstTwo = tokens.slice(0, 2).join(' ')
    if (countryMap[firstTwo]) {
      return {slug: countryMap[firstTwo].slug, display: countryMap[firstTwo].display, rest: tokens.slice(2).join(' ')}
    }
  }
  if (countryMap[tokens[0]]) {
    return {slug: countryMap[tokens[0]].slug, display: countryMap[tokens[0]].display, rest: tokens.slice(1).join(' ')}
  }
  return {slug: 'misc', display: titleCase(name), rest: name}
}

// Build one manifest entry from a file: generic alt/location from the filename,
// place from the country, month/year from mtime, placeholder observation.
function buildPhotoMetadata(filePath, countrySlug, countryDisplay) {
  const name = path.basename(filePath)
  const title = name.replace(/\.[^.]+$/, '')
  const slug = slugify(title)
  const id = slug || path.basename(filePath, path.extname(filePath))
  const relativePath = '/field-notes/' + path.relative(fieldNotesRoot, filePath).replace(/\\\\/g, '/')
  const date = fs.statSync(filePath).mtime
  const dims = readImageSize(filePath)
  return {
    id,
    src: relativePath,
    alt: titleCase(title.replace(/^(.+?-)?/, '')),
    location: titleCase(title.replace(/-/g, ' ')),
    place: countryDisplay,
    month: monthName(date),
    year: date.getFullYear().toString(),
    observation: `A moment from ${countryDisplay}.`, 
    width: dims.width,
    height: dims.height,
  }
}

function normalizeFilename(filename) {
  const ext = path.extname(filename)
  const base = path.basename(filename, ext)
  return `${slugify(base)}${ext.toLowerCase()}`
}

// Move new (non-duplicate by SHA-1) pending files into country folders,
// slugifying their names in the process.
function movePendingFiles() {
  const existingFiles = walkDir(fieldNotesRoot)
  const existingHashes = new Set(existingFiles.map((file) => fileHash(file)))

  for (const pendingFile of listFiles(notAddedRoot)) {
    const stat = fs.statSync(pendingFile)
    if (!stat.isFile()) continue
    const hash = fileHash(pendingFile)
    if (existingHashes.has(hash)) continue

    const filename = path.basename(pendingFile)
    const cleanName = filename.replace(/\.[^.]+$/, '')
    const normalizedName = cleanName.replace(/\s+/g, ' ').trim()
    const {slug: countrySlug} = getCountryFromName(normalizedName)
    const destDir = path.join(fieldNotesRoot, countrySlug)
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, {recursive: true})
    const destFilename = normalizeFilename(filename)
    const destPath = path.join(destDir, destFilename)
    fs.renameSync(pendingFile, destPath)
    existingHashes.add(hash)
  }
}

// Move pending files, then rebuild the manifest = the existingPhotos seed + one
// entry per remaining image (sorted by id). Writes both output JSON files.
function buildManifest() {
  movePendingFiles()
  const files = walkDir(fieldNotesRoot)
  const existingSrcs = new Set(existingPhotos.map((photo) => photo.src))
  const manifest = [...existingPhotos]
  for (const filePath of files) {
    const relative = '/field-notes/' + path.relative(fieldNotesRoot, filePath).replace(/\\\\/g, '/')
    if (existingSrcs.has(relative)) continue
    const dirname = path.basename(path.dirname(filePath))
    const countryDisplay = Object.values(countryMap).find((entry) => entry.slug === dirname)?.display || titleCase(dirname.replace(/-/g, ' '))
    manifest.push(buildPhotoMetadata(filePath, dirname, countryDisplay))
  }
  manifest.sort((a, b) => a.id.localeCompare(b.id))
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  fs.writeFileSync(sourceJsonPath, JSON.stringify(manifest, null, 2) + '\n')
}

if (!fs.existsSync(fieldNotesRoot)) {
  throw new Error('Missing public/field-notes directory')
}
if (!fs.existsSync(notAddedRoot)) {
  throw new Error('Missing public/field-notes-not-added directory')
}
if (!fs.existsSync(path.dirname(sourceJsonPath))) {
  fs.mkdirSync(path.dirname(sourceJsonPath), { recursive: true })
}

buildManifest()
console.log('Field notes manifest generated at', manifestPath)
console.log('Field notes source JSON generated at', sourceJsonPath)
