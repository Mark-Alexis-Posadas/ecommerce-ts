# Storefront engineering tooling

Read AGENTS.md. Run commands from this directory:

```sh
npm run format -- src/path/to/changed-file.tsx
npm run format:check
npm run typecheck
npm run lint
npm run build
```

Prettier 3.10.1 and eslint-config-prettier 10.1.8 are pinned. Formatting uses the checked-in
configuration and excludes dependencies, generated artifacts, lockfiles, environment files and
binary assets. Use explicit changed paths during feature development. A whole-app formatting
pass is reserved for a dedicated formatting-only cleanup, as authorized on 2026-11-22.

VS Code settings require the Prettier and ESLint editor extensions; none were installed
automatically. Code-quality rules remain enabled. TypeScript strictness is unchanged.

## Cleanup verification: 2026-11-22

Full formatting check, TypeScript and ESLint pass with zero errors or warnings.
Production build passed.
Storefront originally had four explicit-any errors and one effect-dependency warning. These are resolved through typed order contracts, unknown-error narrowing and a session-aware order effect.

No local test script exists. Run npm test in the sibling ecommerce-ts-backend repository for the 45-test isolated suite, including authentication, cart, catalog and order-effect regressions. Report unavailable cross-application tests in standalone checkouts.

The legacy order-history hook still contains mock data. Shipping names are accepted by validation but absent from the persisted order schema. Those business-flow issues remain separate work.
