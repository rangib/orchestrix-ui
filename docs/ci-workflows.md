CI Workflows
============

This project includes basic GitHub Actions workflows for code checks and infra validation:

- `check-code.yml`: lint, type-check, and unit tests (runs on push/PR to `main`).
- `check-infra.yml`: validates `infra/main.bicep` using `az bicep build`.
- `check-deps.yml`: scheduled dependency audit using `npm audit`.

Local developer helper: `scripts/ci-checks.ps1` runs the same checks on Windows.

Local verification (PowerShell)
-------------------------------

From the repository root use the Windows helper to run lint/type-check and unit tests:

```powershell
.\scripts\ci-checks.ps1
```

Or run steps individually:

```powershell
cd src
npm ci
npm run lint
npx tsc --noEmit
npm run test:coverage
```

Cross-platform (bash)
----------------------

```bash
cd src
npm ci
npm run lint
npx tsc --noEmit
npm run test:coverage
```
CI Workflows
============

This project includes basic GitHub Actions workflows for code checks and infra validation:

- `check-code.yml`: lint, type-check, and unit tests (runs on push/PR to `main`).
- `check-infra.yml`: validates `infra/main.bicep` using `az bicep build`.
- `check-deps.yml`: scheduled dependency audit using `npm audit`.

Local developer helper: `scripts/ci-checks.ps1` runs the same checks on Windows.
