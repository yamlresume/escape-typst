# Scripts

This directory contains utility scripts for the escape-typst project.

## extract-changelog.sh

Extracts a version's entries from `CHANGELOG.md`.

```bash
# Extract to stdout
./scripts/extract-changelog.sh 0.1.0

# Extract to a file
./scripts/extract-changelog.sh v0.1.0 release_notes.md
```

The version may include a leading `v`. The script exits with status `1` when
the changelog, requested version, or version content is missing.
