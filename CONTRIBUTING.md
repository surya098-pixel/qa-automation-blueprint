# Contributing

Thanks for your interest in improving **qa-automation-blueprint**! Issues, discussions, and pull requests are all welcome.

## Ways to help

- 🐛 [Report a bug](../../issues/new?template=bug_report.md)
- 💡 [Request a feature](../../issues/new?template=feature_request.md)
- 📖 Improve the README, examples, or inline docs
- 🧪 Add a new example test, page object, or fixture
- ⚡ Refactor for clarity, performance, or better DX

## Local development

```bash
git clone https://github.com/surya098-pixel/qa-automation-blueprint.git
cd qa-automation-blueprint
npm ci
npx playwright install --with-deps
cp .env.example .env

npm test               # run everything
npm run test:ui        # interactive UI mode
npm run test:debug     # step through with Playwright Inspector
npm run lint           # eslint (0 warnings)
npm run type-check     # tsc --noEmit
```

## Pull request checklist

- [ ] `npm run lint` passes with 0 warnings
- [ ] `npm run type-check` passes
- [ ] `npm test` passes locally (at least on Chromium)
- [ ] New tests follow the POM + fixture pattern used elsewhere
- [ ] README updated if user-facing behavior changed
- [ ] Commit messages describe the *why*, not just the *what*
- [ ] Branch is rebased on `main`

## Coding conventions

- **No hard-coded selectors in tests** — put them on the page object
- **No `page.locator('...')` in step files** — go through the page object
- **Test files describe user behavior**, not implementation
- Use `expect()` from `@fixtures/pages.fixture`, not from `@playwright/test` directly, so shared config kicks in
- Prefer `getByRole` / `getByLabel` over CSS selectors — they're accessibility-aware

## Code of Conduct

Be kind. Assume good intent. If something is wrong, [open an issue](../../issues/new) and we'll sort it out.

## Questions?

[Start a discussion](../../discussions) — happy to help.
