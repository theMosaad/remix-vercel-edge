# Remix on Vercel's Edge runtime

## Demo
https://remix-vercel-edge-mosaad.vercel.app

## Build and Run Remix (Local)
```
npm i && npm run dev:build && npm run dev:start
```

## Clone vercel/vercel
```bash
git clone git@github.com:vercel/vercel.git
```

## Fetch the PR with the patch
```bash
# ./vercel
git fetch origin pull/8784/head:remix-edge
```

## Checkout the created branch
```bash
# ./vercel
git checkout remix-edge
```

## Build Vercel
```bash
# ./vercel
yarn && yarn build
```

## Build Remix (Prod)
```bash
# ./vercel/packages/cli
yarn dev build --cwd ~/code/remix-vercel-edge --prod
```

# Deploy Remix
```bash
# ./vercel/packages/cli
yarn dev deploy ~/code/remix-vercel-edge --prebuilt --prod
```
