#!/bin/bash

# Extract changelog for a specific version from CHANGELOG.md
# Usage: ./extract-changelog.sh <version> [output_file]

set -e

VERSION="$1"
OUTPUT_FILE="$2"

if [ -z "$VERSION" ]; then
  echo "Usage: $0 <version> [output_file]"
  echo "Example: $0 0.1.0"
  exit 1
fi

VERSION="${VERSION#v}"

if [ ! -f "CHANGELOG.md" ]; then
  echo "Error: CHANGELOG.md not found" >&2
  exit 1
fi

extract_changelog() {
  awk -v version="$VERSION" '
  BEGIN {
    found=0
    content=""
    in_section=0
  }

  /^## \[/ {
    if (found && in_section) {
      exit
    }
    if ($0 ~ "\\[" version "\\]") {
      found=1
      in_section=1
      next
    }
  }

  found && in_section {
    if (content == "" && /^$/) {
      next
    }

    if (content != "") {
      content = content "\n" $0
    } else {
      content = $0
    }
  }

  END {
    if (!found) {
      print "No changelog found for version " version > "/dev/stderr"
      exit 1
    }

    gsub(/\n+$/, "", content)

    if (content == "") {
      print "No content found for version " version > "/dev/stderr"
      exit 1
    }

    print content
  }
  ' CHANGELOG.md
}

CHANGELOG_CONTENT=$(extract_changelog)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  exit $EXIT_CODE
fi

if [ -n "$OUTPUT_FILE" ]; then
  echo "$CHANGELOG_CONTENT" > "$OUTPUT_FILE"
  echo "Changelog for version $VERSION written to $OUTPUT_FILE" >&2
else
  echo "$CHANGELOG_CONTENT"
fi
