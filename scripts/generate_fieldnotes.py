#!/usr/bin/env python3
"""
generate_fieldnotes.py — regenerate the Field Notes manifest (LEGACY / UNSAFE).

Moves pending images from public/field-notes-not-added into
public/field-notes/<country>/ (SLUGIFYING their filenames), parses each image's
pixel dimensions with a hand-rolled PNG/JPEG/WEBP reader, and rewrites BOTH
public/field-notes/manifest.json and lib/field-notes-data.json from scratch —
with generic "A moment from <country>." observations and dates from file mtime.

⚠ DO NOT RUN against the current data. It will:
  - overwrite the hand-curated manifest (locations, observations, dates, order),
  - rename files away from the current "Country Descriptor.jpg" convention,
  - regenerate lib/field-notes-data.json (a dead file nothing imports), and
  - ignore EXIF orientation, producing wrong width/height for rotated photos.

The current workflow (resize to a 2560px cap + sharp-derived dimensions + manual
manifest edits) is documented in AGENTS.md. Kept only for historical reference.
"""
import os, shutil, hashlib, json, re, struct
from datetime import datetime

ROOT = os.getcwd()
PUBLIC = os.path.join(ROOT, 'public')
FIELD_NOTES = os.path.join(PUBLIC, 'field-notes')
NOT_ADDED = os.path.join(PUBLIC, 'field-notes-not-added')
LIB = os.path.join(ROOT, 'lib')
MANIFEST = os.path.join(FIELD_NOTES, 'manifest.json')
SOURCE_JSON = os.path.join(LIB, 'field-notes-data.json')

country_map = {
    'usa': ('usa', 'United States'),
    'us': ('usa', 'United States'),
    'united': ('usa', 'United States'),
    'austria': ('austria', 'Austria'),
    'laos': ('laos', 'Laos'),
    'mexico': ('mexico', 'Mexico'),
    'iceland': ('iceland', 'Iceland'),
    'norway': ('norway', 'Norway'),
    'new': ('new-zealand', 'New Zealand'),
    'portugal': ('portugal', 'Portugal'),
    'vietnam': ('vietnam', 'Vietnam'),
    'bolivia': ('bolivia', 'Bolivia'),
    'liechtenstein': ('liechtenstein', 'Liechtenstein'),
    'aruba': ('aruba', 'Aruba'),
    'ireland': ('ireland', 'Ireland'),
    'copenhagen': ('denmark', 'Denmark'),
    'denmark': ('denmark', 'Denmark')
}

def slugify(s):
    s = s.lower()
    s = re.sub(r"\.[^./]+$", '', s)
    s = re.sub(r"[^a-z0-9]+", '-', s)
    s = re.sub(r"-+", '-', s)
    return s.strip('-')

def titlecase(s):
    s = re.sub(r"\.[^./]+$", '', s)
    s = re.sub(r"[-_]+", ' ', s)
    return ' '.join(w.capitalize() for w in s.split())

def read_dim(path):
    """Best-effort intrinsic (w, h) by parsing PNG/JPEG/WEBP headers directly.
    Ignores EXIF orientation, so rotated JPEGs come back with swapped dims.
    Falls back to (1000, 1000) on anything it can't read."""
    try:
        with open(path, 'rb') as f:
            data = f.read(64)
            # PNG
            if data[:8] == b'\x89PNG\r\n\x1a\n':
                with open(path,'rb') as f2:
                    f2.seek(16)
                    w = struct.unpack('>I', f2.read(4))[0]
                    h = struct.unpack('>I', f2.read(4))[0]
                    return w,h
            # JPEG
            if data[:2] == b'\xff\xd8':
                with open(path,'rb') as f2:
                    f2.seek(2)
                    while True:
                        marker = f2.read(1)
                        if not marker or marker != b'\xff':
                            break
                        code = f2.read(1)
                        while code == b'\xff':
                            code = f2.read(1)
                        if code in [b'\xc0', b'\xc1', b'\xc2', b'\xc3', b'\xc5', b'\xc6', b'\xc7', b'\xc9', b'\xca', b'\xcb', b'\xcd', b'\xce', b'\xcf']:
                            size = struct.unpack('>H', f2.read(2))[0]
                            data = f2.read(5)
                            h = struct.unpack('>H', data[1:3])[0]
                            w = struct.unpack('>H', data[3:5])[0]
                            return w,h
                        else:
                            size = struct.unpack('>H', f2.read(2))[0]
                            f2.seek(size-2,1)
            # WEBP (RIFF)
            if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
                with open(path,'rb') as f2:
                    f2.seek(12)
                    chunk = f2.read(4)
                    if chunk == b'VP8X':
                        f2.seek(24)
                        w = int.from_bytes(f2.read(3), 'little') + 1
                        h = int.from_bytes(f2.read(3), 'little') + 1
                        return w,h
                    if chunk == b'VP8 ':
                        f2.seek(26)
                        w = struct.unpack('<H', f2.read(2))[0]
                        h = struct.unpack('<H', f2.read(2))[0]
                        return w,h
    except Exception:
        pass
    return 1000,1000


def file_hash(path):
    h = hashlib.sha1()
    with open(path,'rb') as f:
        while True:
            b = f.read(8192)
            if not b: break
            h.update(b)
    return h.hexdigest()


def walk_fieldnotes():
    out=[]
    if not os.path.isdir(FIELD_NOTES): return out
    for root,dirs,files in os.walk(FIELD_NOTES):
        for fn in files:
            if fn.endswith('Zone.Identifier'): continue
            out.append(os.path.join(root,fn))
    return out


def process_pending():
    """Move new pending files into country folders (deduped by SHA-1), inferring
    the country from the leading filename word and SLUGIFYING the destination
    name — which is what breaks the current naming convention."""
    if not os.path.isdir(NOT_ADDED):
        print('No pending folder', NOT_ADDED)
        return
    existing_hashes = set()
    for p in walk_fieldnotes():
        existing_hashes.add(file_hash(p))
    for fn in sorted(os.listdir(NOT_ADDED)):
        if fn.endswith('Zone.Identifier'): continue
        src = os.path.join(NOT_ADDED, fn)
        if not os.path.isfile(src): continue
        h = file_hash(src)
        if h in existing_hashes:
            # duplicate, delete pending
            os.remove(src)
            continue
        # decide country
        base = fn.replace('.',' ').split()[0].lower()
        country_slug, country_display = ('misc','Misc')
        if base in country_map:
            country_slug, country_display = country_map[base]
        else:
            # try token match
            for k,v in country_map.items():
                if k in fn.lower():
                    country_slug, country_display = v
                    break
        dest_dir = os.path.join(FIELD_NOTES, country_slug)
        os.makedirs(dest_dir, exist_ok=True)
        ext = os.path.splitext(fn)[1].lower()
        dest_name = slugify(fn) + ext
        dest_path = os.path.join(dest_dir, dest_name)
        # avoid overwrite
        if os.path.exists(dest_path):
            dest_path = os.path.join(dest_dir, slugify(fn) + '-' + h[:8] + ext)
        shutil.move(src, dest_path)
        existing_hashes.add(h)


def build_manifest():
    """Rebuild every manifest entry from the files on disk — generic alt/location
    from the filename, place from the folder, month/year from mtime, and a
    placeholder observation. Overwrites all hand-curated metadata."""
    items = []
    for p in walk_fieldnotes():
        rel = os.path.relpath(p, FIELD_NOTES).replace('\\\\','/')
        parts = rel.split(os.sep)
        if len(parts) >= 2:
            country = parts[0]
            filename = parts[-1]
        else:
            country = 'misc'
            filename = parts[0]
        src = '/field-notes/' + '/'.join(parts)
        w,h = read_dim(p)
        mtime = datetime.fromtimestamp(os.path.getmtime(p))
        month = mtime.strftime('%B')
        year = str(mtime.year)
        title = titlecase(os.path.splitext(filename)[0])
        item = {
            'id': slugify(os.path.splitext(filename)[0]),
            'src': src,
            'alt': title,
            'location': title,
            'place': titlecase(country.replace('-', ' ')),
            'month': month,
            'year': year,
            'observation': f'A moment from {titlecase(country.replace("-", " "))}.',
            'width': w,
            'height': h
        }
        items.append(item)
    # sort by id to be deterministic
    items.sort(key=lambda x: x['id'])
    return items


def main():
    os.makedirs(FIELD_NOTES, exist_ok=True)
    os.makedirs(LIB, exist_ok=True)
    process_pending()
    manifest = build_manifest()
    with open(MANIFEST, 'w', encoding='utf8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    with open(SOURCE_JSON, 'w', encoding='utf8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print('Wrote', MANIFEST)
    print('Wrote', SOURCE_JSON)

if __name__ == '__main__':
    main()
