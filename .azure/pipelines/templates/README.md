# Azure DevOps Pipeline Templates

This folder contains reusable Azure DevOps pipeline templates that implement the CI/CD stages defined in the repository's Copilot instructions.

## Templates

- **check-code.yml** - Linting, type-checking, unit tests, and coverage reporting
- **check-infra.yml** - Infrastructure validation, Bicep build, and security scanning
- **check-deps.yml** - Dependency auditing and vulnerability scanning
- **packages-build.yml** - Build and test the StencilJS component packages

## Usage

These templates are referenced from the root `azure-pipelines.yml` file and are designed to be non-blocking initially while you configure service connections and thresholds.

## Configuration Required

Before enabling strict enforcement, configure:
1. Azure DevOps service connections for Azure Resource Manager
2. Variable groups for secrets and environment-specific settings
3. SARIF upload permissions for security scanning results
4. Coverage reporting thresholds and artifact publishing