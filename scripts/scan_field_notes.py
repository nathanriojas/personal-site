#!/usr/bin/env python3
"""
scan_field_notes.py — Field Notes duplicate-finder (LEGACY debug utility).

Prints the SHA-1 hash of every file directly inside `public/field-notes` and
`public/field-notes-not-added`, so you can eyeball which pending images are
byte-for-byte duplicates of ones already added. Read-only — it moves and writes
nothing.

STATUS: legacy. It scans only the TOP LEVEL of each folder, so it predates the
current country-subfolder layout (`public/field-notes/<country>/...`) and will
no longer see organized images. Kept only as a quick manual diffing aid; the
current workflow is documented in AGENTS.md.
"""
import os, hashlib

root1 = 'public/field-notes'
root2 = 'public/field-notes-not-added'


def hashes(root):
    """Return (filename, sha1, path) for each top-level file, skipping the
    Windows `*:Zone.Identifier` metadata artifacts."""
    out = []
    for fn in os.listdir(root):
        if fn.endswith('Zone.Identifier'):
            continue
        path = os.path.join(root, fn)
        if os.path.isfile(path):
            with open(path, 'rb') as f:
                h = hashlib.sha1(f.read()).hexdigest()
            out.append((fn, h, path))
    return out


# Print both sets so duplicates can be spotted by matching hashes across lines.
existing = hashes(root1)
pending = hashes(root2)
for fn, h, p in sorted(existing):
    print('EXISTING', fn, h)
for fn, h, p in sorted(pending):
    print('PENDING', fn, h)
