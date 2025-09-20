CI Next Steps
=============

Suggested improvements and follow-ups you may want to add:

- Coverage badge: add a badge to README that displays coverage percentage (use Codecov or Coveralls).
- Coverage PR gating: fail CI if coverage falls below thresholds (currently thresholds exist in `vitest.config.ts`).
- PR coverage delta: comment on PRs with file-level coverage diffs (use codecov or a custom script).
- SARIF uploads: upload ESLint/TSC SARIF results to GitHub code scanning for inline feedback.
- Infra policy checks: run `checkov` or `conftest` against generated ARM templates from Bicep.
- Expanded integration tests: add tests for chat API, document processing, and auth flows using MSW and a small test harness.

Notes on Codecov and PR opt-out
--------------------------------

- The workflow uploads coverage to Codecov using `codecov/codecov-action`. For private repos you will need to set the `CODECOV_TOKEN` secret in the repository settings. The workflow uses the secret only if present.
- If you want to avoid automatic coverage comments on PRs, disable or remove the `Post coverage summary to PR` step in `.github/workflows/check-code.yml`.

Disable automatic coverage comments via secret
--------------------------------------------

Set the repository secret `DISABLE_COVERAGE_COMMENT` to `true` (Repository Settings → Secrets → Actions). When set, the `check-code.yml` workflow will skip posting the summary comment to PRs.


SARIF uploads implemented
-------------------------

The `check-code.yml` workflow now exports ESLint results as SARIF and uploads them to GitHub Code Scanning. You can view ESLint issues in the Security -> Code scanning alerts section of the repository once the workflow runs.


