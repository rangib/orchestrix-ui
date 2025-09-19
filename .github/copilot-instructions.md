<!-- Copilot Instructions for the orchestrix-ui repo -->

# Copilot / AI Agent Guidance (concise)

This file tells AI coding agents how to be immediately productive in this repository.

1. Big picture
- Tech stack: Next.js 14 (app router), React 18, TypeScript, TailwindCSS. Backend logic lives in Next.js server routes under `src/app/(authenticated)/api/*` and feature services in `src/features/*`.
- Cloud infra: Azure resources are authored in Bicep under `infra/` (main.bicep -> resources.bicep + modules). App deployment expects `output` values from the Bicep modules (App URL, KeyVault names, etc.).
- Authentication: NextAuth is used; `src/middleware.ts` enforces authentication via `next-auth/jwt.getToken`. Infra controls `USE_MANAGED_IDENTITIES` via `disableLocalAuth` in Bicep.

2. Key files and examples (copyable patterns)
- Dev commands: run from the `src` folder: `npm run dev`, `npm run build`, `npm run start` (see `src/package.json`).
- API route pattern: server route handlers use the app-router `route.ts` signature. Example: `src/app/(authenticated)/api/chat/route.ts`:

  export async function POST(req: Request) {
    const formData = await req.formData();
    return await ChatAPIEntry(...);
  }

- Server-only modules: many server services use `"use server"` and `import "server-only"` (see `src/features/chat-page/chat-services/*`). Treat these as server-side code only.
- SSE streaming: Chat response uses Server-Sent Events with `Content-Type: text/event-stream` (see `ChatAPIEntry` in `src/features/.../chat-api/chat-api.ts`). Be careful to preserve streaming boundaries when refactoring.

3. Project conventions and gotchas
- Feature-based layout: code is organized by feature under `src/features/*` and `src/app/*`. Follow that pattern when introducing new behaviour.
- Shared imports use path aliases starting with `@/` (root `src`), so use existing module paths when moving code.
- Auth middleware matcher: `src/middleware.ts` defines protected paths and `isAdmin` checks. Avoid changing middleware routing without updating the `matcher` array.
- Infra is Bicep (not Terraform). The user intends to migrate to Terraform — do not convert infra in-place without a dedicated migration plan.
- Package scripts: the `debug` script sets `NODE_OPTIONS` using `set` (Windows CMD style) in `src/package.json`. On PowerShell use `$env:NODE_OPTIONS='--inspect'` before `next dev` if needed.

4. Integration points
- Azure services used: Azure OpenAI, Cognitive Services (Form Recognizer, Speech), Cosmos DB, Azure Search, Storage, Key Vault. See `infra/resources.bicep` for exact resource names and app settings.
- Key Vault references: app settings use `@Microsoft.KeyVault(VaultName=...;SecretName=...)` placeholders in Bicep. When changing secret names, update both Bicep and runtime code that expects env var names (see `appSettingsCommon` in `infra/resources.bicep`).
- NextAuth config: `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are injected by infra. Look in `infra/resources.bicep` for the authoritative names.

5. Developer workflows (how to run / deploy)
- Local dev (frontend+server):
  - cd `src`
  - `npm install` (if needed)
  - `npm run dev`
- Azure infra & deployment: README recommends using Azure Developer CLI (`azd init -t microsoft/azurechat` then `azd up`). Outputs from `infra/main.bicep` produce the app URL and resource names used by the app.

6. When editing code be conservative
- Preserve `"use server"` / `server-only` files as server-only. Moving code into client bundles can accidentally leak secrets.
- Keep streaming handlers (SSE) intact. If you refactor OpenAI streaming logic, add an integration test that verifies SSE framing.

7. Refactor / roadmap items (user priorities)
The repository owner has mandated the following refactor goals — use these as a prioritized roadmap. For each item, start by identifying the touchpoints below before implementing changes.

- APIM for all API communication: touchpoints — `src/app/(authenticated)/api/*` route handlers and `infra/*` (add APIM resource). Preserve existing route signatures and ensure APIM can forward JWT cookies or tokens.
- Two app registrations: locate `scripts/appreg_setup.ps1` and `scripts/appreg_setup.sh` and `docs/3-add-identity.md`. Plan changes to `NextAuth` config and Bicep outputs (`NEXTAUTH_URL`, `clientId`) so one registration is for NextAuth, the other for service-to-service auth.
- DRY & separation: search for duplicate service code under `src/features/*`. Create `src/shared/` modules for server-only helpers (e.g., chat-thread, message services) and `src/client/` for strictly client-only UI helpers. Preserve feature-based structure.
- Infra: current infra = Bicep (`infra/*.bicep`). For Terraform migration, produce a one-to-one mapping and keep Bicep intact until TF is validated. Implement modules for: networking, identity, compute (App Service), AI services, data stores.
- Environments: repo currently parameterizes via Bicep params. Add conventional folder for env-specific TF/Bicep variables: `infra/envs/{dev,uat,prod}`.
- Testing + mocks: add unit tests under `src/__tests__/*`, integrate Mock Service Worker for client-side API mocking (`src/mocks/`), and server-side MSW setup for edge/runtime testing.
- Observability: add OpenTelemetry instrumentation in server routes and worker/edge entrypoints. Start by instrumenting `ChatAPIEntry` and middleware.

17. Frontend framework and package upgrades
- StencilJS: The repo owner requested considering `StencilJS` for shared web components. Do not replace existing React UI without a migration plan. If migrating, scaffold a small `packages/components` monorepo with Stencil build, storybook, and wrappers for React usage. Add a migration plan section documenting incremental steps, compatibility testing, and CI build steps.
- Package upgrades: Add a policy to upgrade packages in a controlled manner:
  - Use Dependabot to propose minor/patch upgrades automatically.
  - Group major upgrades into a single feature branch and run full integration + e2e tests against `uat` before merging to `release/*`.
  - For each major upgrade create a short migration note in `docs/deps-upgrade.md` documenting breaking changes and test verification steps.

8. Safety and review hints for AI agents
- Always run type-check (`tsc`) and `npm run lint` locally in `src` after changes. If modifying infra, validate Bicep with `az bicep build` and run `azd` or `az deployment` dry-runs.
- Do not change secrets or KeyVault names unless you update `infra/` and the README documentation.

9. Where to ask for help in this repo
- Major docs: `README.md` and `docs/*` (auth, deploy, managed identities). Use them as the ground truth for infra/auth conventions.

10. CI / Pipeline scanning and pre-commit policy (required)
- Lint-first policy: All code changes must run linters before any build or test step to fail fast and prevent committing broken code. Use `npm run --prefix src lint` as the canonical lint command.
- Pipeline checks: CI must scan and gate on the following stages (order matters):
  1. Linting (`src`) — run ESLint and fail fast.
 2. Type-check (`tsc --noEmit` in `src`).
 3. Unit tests (`npm test` / `vitest` or `jest` as implemented).
 4. Dependency security scan (`npm audit --audit-level=moderate` or Snyk/Dependabot policy).
 5. Infrastructure validation: `az bicep build infra/main.bicep --stdout` and a linter or `conftest` policy check against generated ARM templates.
 6. Configuration scanning: run `gitleaks` or `truffleHog` to detect secrets in PRs and infra templates.

- SARIF & reporting: publish ESLint/TS and security SARIF reports to GitHub so findings show in the Security/Code scanning UI.
- Pre-commit hooks: add `husky` + `lint-staged` (or a lightweight `pre-commit` script) to run `eslint --fix` and `npm run --prefix src tsc --noEmit` locally before allowing a commit. Keep the hooks minimal to avoid blocking developers (lint fix + quick typecheck only).

11. Dependency and configuration scanning
- Dependency policy: run `npm ci` in `src` on CI and fail on high vulnerabilities. Prefer `npm audit --audit-level=moderate` for PR checks; run full `npm audit` nightly.
- Supply-chain: enable Dependabot for `src/package.json` and any infra providers. Add a scheduled job to rebase dependabot PRs and run tests on them.

12. Infrastructure scanning and policy
- Validate Bicep templates using `az bicep build infra/main.bicep` and convert to ARM for `conftest` or `kics` policy enforcement.
- Run `ps-rule` or a chosen IaC linter against `infra/` (or `tfsec` if/when Terraform modules are generated).
- Keep Bicep as the source-of-truth until Terraform is fully validated. Any TF outputs must match existing Bicep outputs before switching deployments.

13. CI job examples (minimal set)
- `check-code` job (runs on PRs):
  - Checkout repo
  - Setup Node (v20)
  - cd `src` && `npm ci`
  - `npm run --prefix src lint`
  - `npm run --prefix src tsc --noEmit`
  - `npm test`
  - `npm run test:unit`
  - `npm run test:integration`
  - `npm run test:e2e`
  - publish coverage report (fail if coverage < 80%)
- `check-deps` job:
  - `npm ci` in `src`
  - `npm audit --audit-level=moderate`
- `check-infra` job:
  - `az bicep build infra/main.bicep --stdout`
  - Run IaC linter / `conftest` policies
  - Run `gitleaks` scan for secrets

17. Testing (integrated into pipelines)
- Testing strategy:
  - Unit tests: fast, isolated tests for components and server utilities. Run on every PR and locally. Suggested runner: `vitest` or `jest` for Node/React.
  - Integration tests: verify feature-level interactions (e.g., chat services, DB calls mocked or using a test Cosmos instance). Run on PRs and nightly pipelines.
  - E2E tests: run against a deployed test environment (dev/uat). Suggested runner: Playwright or Cypress. Run on merge to `main` or scheduled nightly runs.

- Test commands (add to `src/package.json`):
  - `test:unit` — run unit tests (fast)
  - `test:integration` — run integration tests (requires test infra or mocks)
  - `test:e2e` — run Playwright/Cypress against deployed app
  - `test:coverage` — generate coverage report

- Coverage and gating:
  - Publish coverage reports to CI and fail the `check-code` job if coverage falls below a configurable threshold (suggested default: `80%` overall).
  - Run unit tests in PRs; run integration + e2e for merge-to-main or scheduled pipelines.

- Mock Service Worker (MSW):
  - Use MSW for client-side API mocking in unit/integration tests (`src/mocks/`). For server-side tests, use a server-oriented mocking approach or an ephemeral test backend.
  - Include MSW setup in `test:unit`/`test:integration` to make tests hermetic and fast.

- Example CI updates:
  - Add `test:unit` into `check-code` PR job after lint and type-check.
  - Add an integration-test job that provisions minimal test infra (or uses mocks) and runs `test:integration`.
  - Add an `e2e` workflow that runs on `main` deploys and executes `test:e2e` against the deployed `dev`/`uat` environment.

14. Where to add these files
- CI workflows: add GitHub Actions under `.github/workflows/` with the jobs above. Keep workflows small and focused (separate `check-code`, `check-infra`, `check-deps`).
- Local hooks: add `package.json` changes in `src` (or top-level dev tooling) and include `husky` config. Provide `scripts/ci-checks.ps1` for local Windows PowerShell checks (see `docs/10-private-endpoints.md` for PowerShell patterns).

15. Review and standards
- Follow industry best practices: fail-fast linting, SARIF uploads, IaC policy enforcement, supply-chain scanning, and least-privilege infra changes. Document any exceptions in `docs/` so reviewers know tradeoffs.

If you want, I can scaffold the GitHub Actions workflow files and the local `scripts/ci-checks.ps1` next.

16. Security scanning (recommended tools & CI integration)
- Recommended scanners:
  - Checkov: IaC security scanning for Bicep/ARM/Terraform. Use for policy-as-code checks and CIS/OWASP rules.
  - Trivy: container image and filesystem vulnerability scanning. Use in build pipelines to scan Docker images and node_modules (optional).
  - Snyk or `npm audit`: dependency vulnerability scanning for Node packages. Use Snyk for richer vulnerability data and fix PRs.
  - Semgrep: custom static analysis rules for source code patterns (secrets, insecure API usage, etc.).
  - Gitleaks: secrets scanning in commits/PRs (also useful as a pre-commit hook).

- CI integration examples:
  - Run Checkov against generated ARM templates (after `az bicep build`) or against Terraform plan output. Fail PRs on high/critical findings.
  - Run Trivy during container image build step and fail builds with critical CVEs.
  - Run Snyk or `npm audit` as part of `check-deps` job; consider Snyk's PR remediation flow.
  - Run Semgrep as a quick scan stage; publish results as SARIF for GitHub code scanning.
  - Schedule nightly full scans (Checkov + Snyk + Trivy) and publish a consolidated report.

- Thresholds and actions (example):
  - Fail PRs on High/Critical IaC or dependency vulnerabilities. Log/annotate Medium findings for reviewer attention.
  - For infra policy violations (Checkov), block merge until fixed unless an exception is documented in `docs/` and approved.

- Automation & remediation:
  - Enable Dependabot + Snyk auto-fixes for dependency upgrades.
  - Configure Checkov exceptions via `.checkov.yml` and track approved exceptions in `docs/security-exceptions.md`.

If you want, I can scaffold CI steps for these scanners (GitHub Actions), add minimal config files (`.checkov.yml`, `trivy` scan steps, `semgrep.yml`), and wire SARIF uploads. Tell me which scanners to prioritize first.

If anything in this file is unclear or you'd like me to expand a section (for example: generate a concrete Terraform module plan, or start the APIM + two-app-registration work), tell me which item to prioritize next.

18. Azure DevOps workflow guidance (using a separate remote)
- Purpose: keep the original GitHub repo untouched during the refactor — use a separate Azure DevOps remote repository for active development and CI/CD pipelines.

- High-level steps:
  1. Create an Azure DevOps project (or reuse an existing one).
 2. In Azure DevOps create a new Git repo for the refactor branch.
 3. Add Azure DevOps as a secondary remote locally and push a working branch there:

```pwsh
# from the repo root
git remote add azure "https://dev.azure.com/<org>/<project>/_git/<repo>"
git push azure HEAD:refs/heads/refactor/apim-two-appreg
```

4. Configure service connections in Azure DevOps:
  - Azure Resource Manager (for deployments with `azd`/`az cli`).
  - Service Principal or Managed Identity for Bicep/Terraform deployments.
  - Variable groups or Key Vault references for secrets (avoid storing secrets in pipeline YAML).

5. Create pipelines in Azure DevOps that mirror the CI stages in this document:
  - `check-code` (lint → type-check → unit tests → publish coverage and SARIF)
  - `check-deps` (dependency audit)
  - `check-infra` (bicep build → checkov → policy checks)
  - `integration` (provision test infra or use mocks → run `test:integration`)
  - `e2e` (deploy to dev/uat → run `test:e2e`)

- Notes and recommendations:
  - Use Azure DevOps pipeline templates to keep jobs consistent across repos.
  - Use `azure-pipelines.yml` in the repo root and keep environment-specific variable groups in the Azure DevOps project.
  - Prefer service connections over embedding credentials. Use Key Vault + variable groups for runtime secrets.

If you want, I can scaffold an `azure-pipelines.yml` skeleton and the Azure DevOps pipeline templates next (I will need your Azure DevOps org/project/repo names or I can use placeholders).

Note: the Azure DevOps repository is assumed to be new and empty. Recommended initial steps for a fresh Azure repo:

- Create the repo in Azure DevOps and set the default branch (e.g., `main` or `develop`).
- Push an initial commit with these files before enabling branch policies:
  - `azure-pipelines.yml` (pipeline templates)
  - `.azure/` (pipeline templates or variable group references)
  - `infra/` (existing Bicep files)
  - `src/` (the current application code pushed as a branch)
- Immediately enable branch policies on the default branch to require PRs, enforce required pipeline checks (`check-code`, `check-infra`), and require code reviews before merge.

If you want, I can scaffold the initial `azure-pipelines.yml` and a minimal first commit structure to push into the empty Azure repo.

**Agent Decision Policy**
- The repository owner authorizes the AI agent to proceed with implementation and recommendations that align with the user's stated goals without asking for explicit approval for trivial or inferable decisions.
- The agent should only pause and request confirmation for "critical" decisions, including but not limited to:
  - Changing authentication flows or app registration configuration that affect production security.
  - Modifying Key Vault secret names, rotating secrets, or placing secrets into code or configuration.
  - Making breaking infrastructure changes that could delete or significantly alter deployed resources (for example, deleting resource groups or modifying private-networking that impacts private endpoints).
  - Actions with substantial billable impact (provisioning large SKUs, large capacity changes, or potentially runaway costs).
  - Publishing releases, changing ownership, or altering license metadata.
- For all non-critical decisions the agent will proceed, record actions in the TODO list, use sensible git commit messages and branch names, and push changes to the secondary remote (`ado_brangi`) when appropriate.
- If uncertain whether a decision is critical, the agent will err on the side of asking for confirmation.

19. Git branching strategy (revised GitFlow)
- Default branch: `main` is the production branch and always reflects production-ready code.
- Release branches: create release branches named `release/x.y.z` (semver). Each release branch is tagged with the same semver and additionally `latest`.
- Feature & bugfix branches:
  - All new features and bugfixes MUST branch from the current release branch (not from `main`). Branch naming examples: `feature/awesome-widget` or `bugfix/fix-logging`.
  - If a feature depends on another feature, the depended-on feature MUST be completed, tested, and merged into the release branch before the dependent feature development begins.
  - A completed feature must pass its tests (unit/integration/e2e as applicable) before it can be merged into any dependent feature or the release branch.
  - Development workflow for a feature that has a dependency:
    1. Complete dependent feature A on `feature/A` → open PR to `release/x.y.z` → run CI (lint, tests, security scans) → merge to `release/x.y.z`.
    2. Create `feature/B` branching from `release/x.y.z` (now containing A). Develop and test B → open PR to `release/x.y.z`.

- Hotfixes:
  - Hotfix branches are always created from `main` and named `hotfix/x.y.z`.
  - Hotfix PRs target `main`, run a full CI (including tests and security scans), and after merge are cherry-picked or merged back into open release branches if required.

- Release process:
  1. Create `release/x.y.z` from `main` or the appropriate source branch.
  2. Stabilize on the release branch with bugfixes and tested features.
  3. Tag the branch with `x.y.z` and `latest` on successful post-deployment testing.
  4. Merge `release/x.y.z` into `main` after successful post-deployment verification.

- Pipelines mapping and enforcement:
  - `check-code` (lint/type-check/unit tests/coverage) runs on all PRs targeting `release/*` and `main`.
  - `check-integration` runs on PRs targeting `release/*` and as scheduled nightly jobs for release branches.
  - `e2e` pipelines run against deployed environments and are executed for release branches prior to tagging and merging into `main`.
  - Hotfix PRs trigger the full pipeline (lint → all tests → security scans → infra validations).

- Branch protection and policies:
  - Enforce branch protection on `main` and `release/*` to require PRs, passing CI checks, and at least one code review approval before merge.
  - Consider requiring signed commits and a two-reviewer policy for `main` merges.

  - Minimum policy requirement: direct commits (pushes) to `main` and any `release/*` branches are disallowed. All changes must go through Pull Requests only. Configure branch policies to:
    - Require pull requests for merges (disable direct pushes).
    - Require the `check-code` pipeline to pass before merge.
    - Require at least one code reviewer approval.
    - Optionally require successful `check-infra` and security scan jobs for release merges.

Examples (PowerShell):

```pwsh
# Create a release branch from main
git checkout main
git pull
git checkout -b release/1.2.0
git push azure release/1.2.0

# Create a feature branch from the release branch
git checkout release/1.2.0
git checkout -b feature/new-search
git push azure feature/new-search
```

If you want, I can update the Azure DevOps pipeline templates to enforce these branch rules and gate merges accordingly.
