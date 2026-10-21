# Aliyan Baig — Portfolio

React and Vite portfolio with a home page, design offerings, and two project pages.

## Development and verification

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

Local tests use installed Google Chrome. CI uses Playwright Chromium. Set `TEST_BASE_URL` to test an existing deployment instead of starting Vite.

The build emits individual HTML entry points for `/store`, `/works/surge-station`, and `/works/amenti-hr`, plus `404.html`. Vercel clean URLs serve these routes directly with page-specific metadata. Shared profile and project content lives in `src/content.js`.

## Deployment

Pushes to `main` run `.github/workflows/deploy-vercel.yml`: pull Vercel production settings, build, run browser and accessibility checks, then deploy the prebuilt output. Required GitHub Actions secrets are `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. Never commit their values.

Production: https://portfolio-five-vert-npb4fujz7y.vercel.app/

Contact and booking calls to action use the existing email and phone links. There is no form backend or calendar integration in this project.

See [AUDIT.md](AUDIT.md) for findings and verification scope.
