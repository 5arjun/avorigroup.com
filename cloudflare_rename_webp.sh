#!/bin/bash

set -Eeuo pipefail
shopt -s nullglob nocaseglob

QUALITY="${QUALITY:-82}"
FOLDER_NAME="$(basename "$PWD")"

PHOTO_COUNT=0
VIDEO_COUNT=0

lower() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]'
}

slugify() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g'
}

BASE="$(slugify "$FOLDER_NAME")"
TMP_DIR=".webp_convert_tmp_$$"

mkdir -p "$TMP_DIR"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

find_magick() {
  if command -v magick >/dev/null 2>&1; then
    command -v magick
    return
  fi

  for p in /opt/homebrew/bin/magick /usr/local/bin/magick; do
    if [ -x "$p" ]; then
      echo "$p"
      return
    fi
  done

  return 1
}

MAGICK_BIN="$(find_magick || true)"

if [ -z "${MAGICK_BIN:-}" ]; then
  echo "Error: magick not found."
  echo "Install with: brew install imagemagick"
  exit 1
fi

is_photo() {
  case "$(lower "$1")" in
    *.jpg|*.jpeg|*.png|*.heic|*.heif|*.tif|*.tiff|*.bmp|*.avif|*.gif|*.webp)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

is_video() {
  case "$(lower "$1")" in
    *.mp4|*.mov|*.m4v|*.avi|*.mkv|*.webm)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

files=()
for f in *; do
  [ -f "$f" ] || continue

  if is_photo "$f"; then
    files+=("$f")
    PHOTO_COUNT=$((PHOTO_COUNT + 1))
  fi

  if is_video "$f"; then
    VIDEO_COUNT=$((VIDEO_COUNT + 1))
  fi
done

echo "Folder name : $FOLDER_NAME"
echo "Photos      : $PHOTO_COUNT"
echo "Videos      : $VIDEO_COUNT"
echo

if [ ${#files[@]} -eq 0 ]; then
  echo "No supported image files found in: $PWD"
  exit 1
fi

echo "Base name: $BASE"
echo

cover_source=""
for f in "${files[@]}"; do
  lc="$(lower "$f")"
  case "$lc" in
    cover.*|*cover*.*|hero.*|featured.*|thumbnail.*)
      cover_source="$f"
      break
      ;;
  esac
done

if [ -z "$cover_source" ]; then
  IFS=$'\n' sorted=($(printf "%s\n" "${files[@]}" | sort -V))
  unset IFS
  cover_source="${sorted[${#sorted[@]}-1]}"
fi

echo "Detected cover source: $cover_source"
echo

for src in "${files[@]}"; do
  stem="$(basename "$src")"
  stem="${stem%.*}"
  out="$TMP_DIR/$stem.webp"

  echo "Converting: $src"

  case "$(lower "$src")" in
    *.webp)
      cp "$src" "$out"
      ;;
    *)
      "$MAGICK_BIN" "$src" -auto-orient -strip -quality "$QUALITY" "$out"
      ;;
  esac

  if [ ! -f "$out" ]; then
    echo "Failed to convert: $src"
    exit 1
  fi
done

echo
echo "Conversion complete. Renaming..."

for f in "${files[@]}"; do
  rm -f -- "$f"
done

IFS=$'\n' converted_sorted=($(find "$TMP_DIR" -maxdepth 1 -type f -name "*.webp" -print | sed 's#^.*/##' | sort -V))
unset IFS

cover_stem="$(basename "$cover_source")"
cover_stem="${cover_stem%.*}"

counter=1
for webp_file in "${converted_sorted[@]}"; do
  stem="${webp_file%.*}"

  if [ "$stem" = "$cover_stem" ]; then
    new_name="${BASE}-cover.webp"
  else
    new_name="${BASE}-${counter}.webp"
    counter=$((counter + 1))
  fi

  mv "$TMP_DIR/$webp_file" "./$new_name"
  echo "Created: $new_name"
done

echo
echo "Done."