#!/usr/bin/env bash
set -e

# -----------------------------------------------------------------------------
# migrate-fieldnotes.sh — move pending Field Notes images into country folders
# (LEGACY).
#
# For each file in public/field-notes-not-added, infers the destination country
# from the filename (including city -> country shortcuts like hawaii/chicago ->
# usa), creates public/field-notes/<country>/ if needed, and moves the file in.
# Unknown filenames fall through to a "misc" folder. Windows *.Zone.Identifier
# metadata files are deleted. Does NOT touch manifest.json.
#
# STATUS: legacy / reference only. The current workflow resizes images and
# updates the manifest via the sharp-based flow documented in AGENTS.md.
# -----------------------------------------------------------------------------

# Run from the repo root regardless of where the script is invoked.
cd "$(dirname "$0")"/..

PN="public/field-notes"
PNA="public/field-notes-not-added"

# Country mapping - order matters (longer matches first)
declare -A COUNTRY_MAP
COUNTRY_MAP["new zealand"]="new-zealand"
COUNTRY_MAP["liechtenstein"]="liechtenstein"
COUNTRY_MAP["austria"]="austria"
COUNTRY_MAP["iceland"]="iceland"
COUNTRY_MAP["ireland"]="ireland"
COUNTRY_MAP["laos"]="laos"
COUNTRY_MAP["mexico"]="mexico"
COUNTRY_MAP["portugal"]="portugal"
COUNTRY_MAP["vietnam"]="vietnam"
COUNTRY_MAP["bolivia"]="bolivia"
COUNTRY_MAP["aruba"]="aruba"
COUNTRY_MAP["denmark"]="denmark"
COUNTRY_MAP["copenhagen"]="denmark"
COUNTRY_MAP["norway"]="norway"
COUNTRY_MAP["hawaii"]="usa"
COUNTRY_MAP["chicago"]="usa"
COUNTRY_MAP["alaska"]="usa"
COUNTRY_MAP["glacier"]="usa"
COUNTRY_MAP["usa"]="usa"
COUNTRY_MAP["new york"]="usa"
COUNTRY_MAP["new orleans"]="usa"

infer_country() {
  local name="$1"
  local lower=$(echo "$name" | tr '[:upper:]' '[:lower:]')
  
  # Check each mapping
  for key in "new zealand" "liechtenstein" "austria" "iceland" "ireland" "laos" "mexico" "portugal" "vietnam" "bolivia" "aruba" "copenhagen" "denmark" "norway" "hawaii" "chicago" "alaska" "glacier" "usa" "new york" "new orleans"; do
    if [[ "$lower" == *"$key"* ]]; then
      echo "${COUNTRY_MAP[$key]}"
      return
    fi
  done
  
  echo "misc"
}

MOVED=0
SKIPPED=0

if [ -d "$PNA" ]; then
  for file in "$PNA"/*; do
    [ -f "$file" ] || continue
    base=$(basename "$file")
    
    # Skip metadata files
    if [[ "$base" == *.Zone.Identifier ]]; then
      rm -f "$file"
      continue
    fi
    
    country=$(infer_country "$base")
    dest_dir="$PN/$country"
    mkdir -p "$dest_dir"
    
    # Move file
    mv "$file" "$dest_dir/"
    ((MOVED++))
  done
fi

echo "Moved: $MOVED files"
echo "Total images: $(find $PN -type f ! -name "*.json" ! -name "*.Identifier" | wc -l)"

