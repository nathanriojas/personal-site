#!/usr/bin/env python3
"""
move-fieldnotes.py — organize pending Field Notes images by country (LEGACY).

Moves each file from public/field-notes-not-added into
public/field-notes/<country>/ based on a leading country word in the filename
(e.g. "USA Utah The Narrows.jpg" -> usa/). Unlike the generators, this KEEPS the
original filename, which matches the current "Country Descriptor.jpg" convention.
It then rewrites any manifest `src` paths still pointing at the pending folder.

STATUS: legacy. The current workflow resizes images and updates the manifest via
the sharp-based flow (see AGENTS.md); this predates that. Files whose country
prefix isn't recognized, or that would overwrite an existing file, are skipped
and reported.
"""
import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
pending = root / 'public' / 'field-notes-not-added'
organized = root / 'public' / 'field-notes'

COUNTRY_MAPPING = {
    'New Zealand': 'new-zealand',
    'Liechtenstein': 'liechtenstein',
    'USA': 'usa',
    'United States': 'usa',
    'Aruba': 'aruba',
    'Austria': 'austria',
    'Bolivia': 'bolivia',
    'Iceland': 'iceland',
    'Ireland': 'ireland',
    'Laos': 'laos',
    'Mexico': 'mexico',
    'Portugal': 'portugal',
    'Vietnam': 'vietnam',
}
KEYS = sorted(COUNTRY_MAPPING.keys(), key=len, reverse=True)


def resolve_country(filename: str):
    """Map a filename to a country slug by its leading word ("USA ...",
    "Iceland ..."), trying the longest keys first. Returns None on no match."""
    for key in KEYS:
        if filename.startswith(key + ' '):
            return COUNTRY_MAPPING[key]
    return None


def move_images():
    """Move each recognized pending file into its country folder, keeping the
    original name. Returns (moved, skipped) lists for reporting."""
    moved = []
    skipped = []
    for path in sorted(pending.iterdir()):
        if not path.is_file():
            continue
        if 'Zone.Identifier' in path.name:
            skipped.append((path.name, 'zone identifier file'))
            continue
        country = resolve_country(path.name)
        if not country:
            skipped.append((path.name, 'unknown country prefix'))
            continue
        dest_dir = organized / country
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest_path = dest_dir / path.name
        if dest_path.exists():
            skipped.append((path.name, 'target file exists'))
            continue
        path.rename(dest_path)
        moved.append((path.name, country))
    return moved, skipped


def update_manifest(path: Path):
    """Rewrite any `src` still under /field-notes-not-added/ to its new
    /field-notes/<country>/ path. Returns the number of entries changed."""
    if not path.exists():
        return 0
    data = json.loads(path.read_text())
    changed = 0
    for item in data:
        src = item.get('src', '')
        if src.startswith('/field-notes-not-added/'):
            filename = src.rsplit('/', 1)[-1]
            country = resolve_country(filename)
            if country:
                item['src'] = f'/field-notes/{country}/{filename}'
                changed += 1
    if changed:
        path.write_text(json.dumps(data, indent=2) + '\n')
    return changed


def main():
    print('Pending folder:', pending)
    print('Organized folder:', organized)
    if not pending.exists():
        print('ERROR: pending folder does not exist:', pending)
        return
    moved, skipped = move_images()
    print(f'Moved {len(moved)} files.')
    if skipped:
        print('Skipped', len(skipped), 'files:')
        for name, reason in skipped:
            print(' ', name, '-', reason)
    updated = 0
    for manifest_file in [root / 'lib' / 'field-notes-data.json', organized / 'manifest.json']:
        n = update_manifest(manifest_file)
        print(f'Updated {n} entries in {manifest_file.name}')
        updated += n
    print('Total manifest updates:', updated)


if __name__ == '__main__':
    main()
