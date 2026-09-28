#!/bin/sh
# Bundla o renderer (JSX automático, alias @/ e stubs de next/*) e executa.
set -e
cd "$(dirname "$0")/.."
ESBUILD=/home/claude/.npm-global/lib/node_modules/tsx/node_modules/esbuild/bin/esbuild
$ESBUILD .preview/build.tsx --bundle --platform=node --format=cjs --jsx=automatic \
  --alias:@=./src --external:react --external:react-dom --external:next \
  --tsconfig=.preview/tsconfig.json --log-level=warning --outfile=.preview/out/build.cjs
node .preview/out/build.cjs
