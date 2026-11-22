# Storefront engineering tooling

Read AGENTS.md. Run commands from this directory:

```sh
npm run format -- src/path/to/changed-file.tsx
npm run format:check
npm run typecheck
npm run lint
npm run build
```

Formatting requires explicit paths; do not rewrite the entire application during feature work.
Prettier 3.10.1 and eslint-config-prettier 10.1.8 are pinned. VS Code settings require the
Prettier and ESLint editor extensions; these were not installed automatically.

Verified on 2026-11-22: TypeScript and build passed. Whole-app format check reports 67 existing
files requiring a separate formatting-only cleanup. Representative AuthField.tsx was formatted.
ESLint/Prettier conflict check passed. Existing lint failures remain enabled and untouched:

- src/pages/CategoriesPage.tsx:30: explicit any.
- src/pages/OrderDetailsPage.tsx:9,56: explicit any; line 18: missing token effect dependency.
- src/services/orderService.ts:5: explicit any.

Total: four errors and one warning. No local test script exists. With the backend sibling
available, run npm test there: all 41 isolated tests passed, including frontend regressions.
Report missing cross-application tests when using a standalone checkout.
