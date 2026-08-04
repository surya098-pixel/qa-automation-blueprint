# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/).

## [Unreleased]

## [0.2.0] - 2026-08-05

### Added
- **Accessibility testing** — `tests/a11y/accessibility.spec.ts` using `@axe-core/playwright` with WCAG 2.1 A/AA rules
- **Visual regression** — `tests/visual/visual.spec.ts` using Playwright's built-in `toHaveScreenshot`
- Dedicated `visual` project in `playwright.config.ts` with `snapshotPathTemplate` for per-platform baselines
- `npm run test:a11y`, `npm run test:visual`, `npm run test:visual:update` scripts
- Docker-based baseline generation flow documented in README
- **Live sample report** auto-deployed to GitHub Pages on every push to `main`

### Changed
- Pinned `typescript` to `~5.6.x` to prevent transitive resolution to a version incompatible with `typescript-eslint@8`
- A11y + visual sample targets moved to `example.com` (clean baseline) — retargetable to any app

[0.2.0]: https://github.com/surya098-pixel/qa-automation-blueprint/releases/tag/v0.2.0

## [0.1.0] - 2026-08-05

### Added
- Initial public release
- Playwright + TypeScript E2E template with strict mode
- Page Object Model (`BasePage`, `LoginPage`, `InventoryPage`)
- Custom fixtures — page fixtures + auto-login (`storageState`-ready)
- Cross-browser matrix: Chromium / Firefox / WebKit
- Mobile emulation: Pixel 7 / iPhone 14
- API-only test example (no browser)
- Network mocking example via `page.route()`
- Parallel workers + sharding in CI
- Retries + trace + video + screenshots on failure
- HTML report + Allure reporter
- GitHub Actions matrix workflow (3 browsers × 2 shards)
- ESLint 9 flat config + Prettier + strict TypeScript
- `.env` support via `dotenv`
- Path aliases (`@pages/*`, `@fixtures/*`)
- NOTICE file with Apache 2.0 / MIT attributions

[Unreleased]: https://github.com/surya098-pixel/qa-automation-blueprint/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/surya098-pixel/qa-automation-blueprint/releases/tag/v0.1.0
