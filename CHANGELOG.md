# Changelog

All notable changes to this project will be documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/).

## [Unreleased]

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
