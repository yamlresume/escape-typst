# escape-typst

Escape special characters in plain text before inserting it into Typst markup.
The package has no runtime dependencies and exports ESM JavaScript with
TypeScript declarations.

## Installation

```bash
# using pnpm (recommended)
pnpm add escape-typst

# npm
npm i escape-typst

# yarn
yarn add escape-typst
```

## Quick start

```ts
import { escapeTypst, unescapeTypst } from 'escape-typst'

escapeTypst('Use #rect with $x$ and *carefully*.')
// Use \#rect with \$x\$ and \*carefully\*.

unescapeTypst('Use \\#rect with \\$x\\$ and \\*carefully\\*.')
// Use #rect with $x$ and *carefully*.
```

The returned string can be interpolated into a Typst document in markup mode:

```ts
const source = `#let name = [${escapeTypst(userProvidedName)}]`
```

## API

```ts
export function escapeTypst(input: string): string
export function unescapeTypst(input: string): string
```

`escapeTypst` prefixes Typst markup-significant characters with a backslash.
It covers backslashes, content delimiters, code and math markers, labels and
references, raw-text delimiters, smart quotes, comments, symbol shorthands, and
characters used for headings, lists, and numbering.

```text
\ / [ ] ~ - . ' " * _ : ` $ < > @ # = +
```

Ordinary text, Unicode, and whitespace are preserved. Applying the function
more than once is not idempotent because backslashes added by an earlier call
are escaped again.

`unescapeTypst` is the exact inverse for strings produced by `escapeTypst`:

```ts
unescapeTypst(escapeTypst(input)) === input
```

It is not a general-purpose parser for arbitrary Typst markup.

### Scope

This function escapes plain text for **Typst markup mode**. It is not intended
for text inside math mode or quoted Typst string literals, which have different
syntax rules. Newlines are preserved, so consecutive newlines still create
paragraph breaks.

## Development

```bash
pnpm i
pnpm check
pnpm test:cov
pnpm build:prod
```

- Node.js: >= 20
- Build: `pnpm build` for development and `pnpm build:prod` for production
- Tests: `pnpm test` or `pnpm test:cov` with coverage thresholds

## License

MIT
