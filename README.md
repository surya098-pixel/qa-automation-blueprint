# qa-automation-blueprint

> Production-grade **Playwright + TypeScript** E2E testing template.
> Fork it, drop in your app's URL, ship reliable browser tests on day one.

[![E2E Tests](https://github.com/surya098-pixel/qa-automation-blueprint/actions/workflows/e2e.yml/badge.svg)](https://github.com/surya098-pixel/qa-automation-blueprint/actions/workflows/e2e.yml)
[![Lint](https://github.com/surya098-pixel/qa-automation-blueprint/actions/workflows/lint.yml/badge.svg)](https://github.com/surya098-pixel/qa-automation-blueprint/actions/workflows/lint.yml)
[![Playwright](https://img.shields.io/badge/tested_with-Playwright-2EAD33?logo=playwright)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Why this template exists

Most Playwright starters give you `npx playwright init` and stop. This one is what a **QA automation engineer actually ships to a team on day one**:

| Feature | Included |
|---|---|
| Playwright + TypeScript, strict mode | ✅ |
| Page Object Model with a `BasePage` | ✅ |
| Custom fixtures (page fixtures + auto-login fixture) | ✅ |
| Cross-browser: Chromium / Firefox / WebKit | ✅ |
| Mobile emulation: Pixel 7 / iPhone 14 | ✅ |
| Parallel workers + sharding in CI | ✅ |
| Retries + trace + video + screenshots on failure | ✅ |
| HTML report + **Allure** report | ✅ |
| API testing example (no browser) | ✅ |
| Network mocking (`page.route`) example | ✅ |
| GitHub Actions matrix workflow | ✅ |
| ESLint + Prettier + `tsc --noEmit` gate | ✅ |
| `.env` support via `dotenv` | ✅ |
| Path aliases (`@pages/*`, `@fixtures/*`) | ✅ |

## Quick start

```bash
git clone https://github.com/surya098-pixel/qa-automation-blueprint.git
cd qa-automation-blueprint
npm ci
npx playwright install --with-deps
cp .env.example .env

npm test                    # run everything
npm run test:chromium       # single browser
npm run test:ui             # interactive UI mode
npm run test:debug          # step through with Playwright Inspector
npm run report              # open the HTML report
```

## Project structure

```
.
├── .github/workflows/       # CI: matrix e2e + lint
├── src/
│   ├── pages/               # Page Object Model (BasePage + concrete pages)
│   ├── fixtures/            # Custom test fixtures (POM injection, auto-login)
│   ├── utils/               # Shared helpers
│   └── data/                # Test data
├── tests/                   # *.spec.ts — one file per feature
├── playwright.config.ts     # Projects, reporters, retries, sharding
├── tsconfig.json            # Strict TS + path aliases
├── .env.example             # Copy → .env
└── .eslintrc.cjs
```

## Example: writing a new test

```ts
import { test, expect } from '@fixtures/pages.fixture';

test('a user can add an item to their cart', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.open();
  await loginPage.loginAs(process.env.TEST_USER!, process.env.TEST_PASSWORD!);
  await expect(page).toHaveURL(/inventory/);

  await inventoryPage.addFirstItemToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
```

## CI

Every push and PR runs the full matrix — **3 browsers × 2 shards = 6 parallel jobs** — with HTML and Allure artifacts uploaded on every run (pass or fail).

## Adapting to your app

1. Set `BASE_URL` in `.env` (and as a GitHub Actions variable).
2. Store credentials as GitHub Actions **secrets**, never in the repo.
3. Add page objects under `src/pages/`.
4. Add specs under `tests/`.
5. If you need auto-login for most tests, use the fixture in `src/fixtures/auth.fixture.ts`.

## Part of the QA Blueprint series

Three companion templates that cover the QA automation stack end-to-end:

| | Repo | Stack | For |
|---|---|---|---|
| 🎭 | **qa-automation-blueprint** *(you are here)* | Playwright + TypeScript | UI end-to-end tests |
| 🥒 | [api-automation-blueprint](https://github.com/surya098-pixel/api-automation-blueprint) | RestAssured + Cucumber + Java | API contract & regression |
| 🚀 | [load-testing-blueprint](https://github.com/surya098-pixel/load-testing-blueprint) | Gatling + Java | Load, stress & spike |

## License & attribution

This project (the template itself) is released under the **MIT License** — see [LICENSE](LICENSE).
Third-party dependencies (Playwright, TypeScript, ESLint, Allure, etc.) are declared in `package.json` and resolved from npm at install time — none of their code is redistributed here. Full attribution and trademark disclaimers are in [NOTICE](NOTICE).

© 2026 [Surya Reddy](https://github.com/surya098-pixel)

---

<sub>💡 If this template saved you time, [give it a star](../../stargazers) — it helps others find it. Track growth on [star-history](https://star-history.com/#surya098-pixel/qa-automation-blueprint&Date).</sub>

---

*Have a suggestion? Open an issue or PR — this template evolves with real-world QA needs.*
