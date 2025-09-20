# Orchestrix Project Manifest

This manifest consolidates the project vision, frontend playbook, prototype plan, roadmap, and an Agent Execution Guide to enable effective autonomous work by contributors and AI agents.

## 1. Vision (summary)

- Build a policy-driven API management platform (APIM-inspired) with a StencilJS-based design system for UI primitives.

- Core features: modular policies (auth, cache, retry, transformation, redaction), visual policy composer, protocol bridging (OpenAPI/gRPC/MCP), AI-assisted policy tagging, and pluggable config backends (Postgres + Redis/persistent + cache).

- Principles: DRY-first, feature-based boundaries, single source-of-truth design system, observability-first.

## 2. Frontend Playbook (condensed)

- Monorepo layout: `apps/`, `packages/ui-wc`, `packages/ui-react`, `packages/shared`, `packages/observability`, `packages/api`, etc.

- Use StencilJS for primitives; generate React/Vue wrappers.

- Feature structure: each feature contains `client`, `server`, `shared`, `test` folders and strict import boundaries.

- Observability: centralized `packages/observability` with correlation, logging, and analytics adapters.

- Testing: Vitest + MSW + Playwright; Storybook for primitives.

## 3. APIM Prototype Plan (MVP)

- Gateway runtime (request pipeline + policy execution).

- Policies: Auth (JWT/OAuth), Cache (Redis-backed), Retry/Fallback, Request Validation.

- Visual composer: React + ReactFlow for linear flows and condition branches.

- Config store: Postgres (source-of-truth) + Redis (runtime cache & pub/sub).

Milestones

1. Policy contract and runtime composition by tag.

2. Auth + Cache policies & tests.

3. Composer UI with save/load.

4. Redis-based cache & pub/sub.

5. AI-assisted tagging (stretch).

## 4. Roadmap (phases)

- Phase 1 (0-3m): Prototype runtime, basic policies, composer POC.

- Phase 2 (3-9m): Advanced policies, event-sourcing for config, CI, tracing.

- Phase 3 (9-18m): Protocol bridging, AI features, HA & scalability.

## 5. Component Library Strategy

- Single source of truth: `packages/ui-wc` (Stencil primitives), wrappers in `packages/ui-react` and `packages/ui-vue`.

- Build primitives first (Button, Input, Icon), then compositions (FormField, Card), then feature components.

- Tokens: maintain a `packages/tokens` outputting CSS variables used by primitives.

- Storybook: maintain `packages/ui-wc/.storybook` using `@storybook/web-components-vite`.

## 6. Agent Execution Guide (for AI / Copilot agents)

This section provides explicit rules for autonomous agents working in the repo.

Agent operating principles

- Follow repo playbook and manifest as the single source of truth.

- Use the internal TODO manager (`manage_todo_list`) for planning; mark exactly one item `in-progress` at a time.

- Make minimal, focused edits; avoid unrelated refactors.

- Run build/tests when modifying code; prefer surgical edits.

- Do not change secrets, KeyVault names, or production infra without explicit approval.

Decision policy

- Non-critical tasks: proceed autonomously (linting, tests, docs, scaffolding, storybook, small infra patches).

- Critical tasks (require user confirmation): production auth changes, KeyVault/secret edits, destructive infra modifications, provisioning high-cost resources, publishing releases.

Agent tooling & cadence

- For Azure-related code/plans, follow Azure best-practice tool calls before code generation (as previously configured).

- After every 3–5 tool actions or after editing >3 files, post a concise progress update.

- Use Storybook and component builds to validate UI changes.

Commit & PR policy

- Make small commits with clear messages; prefer feature branches for large work.

- Run `npm run --prefix src lint` and `tsc --noEmit` locally (or CI) before commits.

## 7. Practical Next Actions (starter checklist)

- Validate `BaseComponent` token/policy loader at runtime (minimal page using built `components` bundle).

- Flesh out `packages/policy-engine` with a simple Node runtime and an `IServicePolicy` TypeScript interface.

- Create a Storybook story set for primitives in `packages/ui-wc` and wire `ui-button`.

- Add CI jobs to build `packages/ui-wc` and run Storybook static build.

## 8. Where this file lives

- Document canonical updates here (`docs/PROJECT_MANIFEST.md`). Small updates are okay via PRs.

## 9. How to accept agent autonomy

- Reply with one of the accept options:

  - `approve-autonomy` — agent may proceed with non-critical tasks per manifest.

  - `ask-to-proceed` — agent must ask before non-trivial changes.

  - `manual-only` — agent must not change code without explicit human steps.

---

End of manifest.
