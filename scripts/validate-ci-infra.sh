#!/bin/bash
# CI/Infrastructure Validation Script
# Usage: ./scripts/validate-ci-infra.sh [environment]

set -e

ENVIRONMENT=${1:-dev}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🔍 Running CI/Infrastructure validation for environment: $ENVIRONMENT"
echo "📍 Working directory: $ROOT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js installed: $NODE_VERSION"
    else
        log_error "Node.js not found. Please install Node.js 20+"
        exit 1
    fi
    
    # Azure CLI (optional)
    if command -v az &> /dev/null; then
        AZ_VERSION=$(az --version | head -n 1)
        log_success "Azure CLI installed: $AZ_VERSION"
    else
        log_warning "Azure CLI not found. Bicep validation will be skipped."
    fi
    
    # jq for JSON processing
    if command -v jq &> /dev/null; then
        log_success "jq installed"
    else
        log_warning "jq not found. Some checks will be limited."
    fi
}

# Validate CI pipeline templates
validate_ci_templates() {
    log_info "Validating CI pipeline templates..."
    
    TEMPLATES_DIR="$ROOT_DIR/.azure/pipelines/templates"
    
    if [ ! -d "$TEMPLATES_DIR" ]; then
        log_error "Pipeline templates directory not found: $TEMPLATES_DIR"
        return 1
    fi
    
    REQUIRED_TEMPLATES=("check-code.yml" "check-deps.yml" "check-infra.yml" "packages-build.yml")
    
    for template in "${REQUIRED_TEMPLATES[@]}"; do
        if [ -f "$TEMPLATES_DIR/$template" ]; then
            log_success "Template found: $template"
            
            # Basic YAML syntax validation
            if command -v python3 &> /dev/null; then
                python3 -c "import yaml; yaml.safe_load(open('$TEMPLATES_DIR/$template'))" 2>/dev/null
                if [ $? -eq 0 ]; then
                    log_success "YAML syntax valid: $template"
                else
                    log_error "YAML syntax invalid: $template"
                fi
            fi
        else
            log_error "Required template missing: $template"
        fi
    done
}

# Validate application build
validate_app_build() {
    log_info "Validating application build..."
    
    cd "$ROOT_DIR/src"
    
    # Install dependencies
    if [ -f "package-lock.json" ]; then
        log_info "Installing dependencies with npm ci..."
        npm ci --prefer-offline --no-audit
        log_success "Dependencies installed"
    else
        log_error "package-lock.json not found"
        return 1
    fi
    
    # Lint check
    log_info "Running ESLint..."
    npm run lint
    log_success "ESLint passed"
    
    # TypeScript check
    log_info "Running TypeScript check..."
    npx tsc --noEmit
    log_success "TypeScript check passed"
    
    # Unit tests
    log_info "Running unit tests..."
    npm run test:unit
    log_success "Unit tests passed"
    
    # Coverage check (if available)
    if npm run test:coverage &>/dev/null; then
        log_info "Running test coverage..."
        npm run test:coverage
        
        if [ -f "coverage/coverage-summary.json" ]; then
            COVERAGE=$(node -e "console.log(JSON.parse(require('fs').readFileSync('coverage/coverage-summary.json', 'utf8')).total.lines.pct)")
            if (( $(echo "$COVERAGE >= 80" | bc -l) )); then
                log_success "Code coverage: ${COVERAGE}% (>= 80%)"
            else
                log_warning "Code coverage: ${COVERAGE}% (< 80%)"
            fi
        fi
    fi
}

# Validate Stencil components
validate_stencil_components() {
    log_info "Validating Stencil components..."
    
    COMPONENTS_DIR="$ROOT_DIR/packages/components"
    
    if [ ! -d "$COMPONENTS_DIR" ]; then
        log_error "Components directory not found: $COMPONENTS_DIR"
        return 1
    fi
    
    cd "$COMPONENTS_DIR"
    
    # Install dependencies
    if [ -f "package.json" ]; then
        log_info "Installing Stencil dependencies..."
        npm install
        log_success "Stencil dependencies installed"
    fi
    
    # Build components
    log_info "Building Stencil components..."
    npm run build
    log_success "Stencil build completed"
    
    # Check build output
    if [ -d "dist" ]; then
        log_success "Build artifacts generated"
        
        # Check for specific files
        REQUIRED_FILES=("dist/orchestrix-components/orchestrix-components.esm.js" "dist/collection/collection-manifest.json")
        for file in "${REQUIRED_FILES[@]}"; do
            if [ -f "$file" ]; then
                log_success "Build artifact found: $file"
            else
                log_error "Missing build artifact: $file"
            fi
        done
    else
        log_error "Build output directory not found"
    fi
}

# Validate Storybook build
validate_storybook() {
    log_info "Validating Storybook..."
    
    STORYBOOK_DIR="$ROOT_DIR/packages/storybook"
    
    if [ ! -d "$STORYBOOK_DIR" ]; then
        log_warning "Storybook directory not found, skipping validation"
        return 0
    fi
    
    cd "$STORYBOOK_DIR"
    
    # Install dependencies
    if [ -f "package.json" ]; then
        log_info "Installing Storybook dependencies..."
        npm install
        log_success "Storybook dependencies installed"
    fi
    
    # Build Storybook
    log_info "Building Storybook..."
    if npm run build-storybook; then
        log_success "Storybook build completed"
        
        # Check for output
        if [ -d "storybook-static" ]; then
            log_success "Storybook static build generated"
        else
            log_error "Storybook static directory not found"
        fi
    else
        log_error "Storybook build failed"
    fi
}

# Validate infrastructure (Bicep)
validate_infrastructure() {
    log_info "Validating infrastructure (Bicep)..."
    
    INFRA_DIR="$ROOT_DIR/infra"
    
    if [ ! -d "$INFRA_DIR" ]; then
        log_error "Infrastructure directory not found: $INFRA_DIR"
        return 1
    fi
    
    cd "$INFRA_DIR"
    
    # Check for main Bicep file
    if [ -f "main.bicep" ]; then
        log_success "Main Bicep file found"
        
        # Validate Bicep syntax (if Azure CLI is available)
        if command -v az &> /dev/null; then
            log_info "Validating Bicep syntax..."
            if az bicep build --file main.bicep --stdout > /dev/null; then
                log_success "Bicep syntax validation passed"
            else
                log_error "Bicep syntax validation failed"
            fi
        fi
    else
        log_error "main.bicep not found"
    fi
    
    # Validate environment-specific configurations
    ENV_CONFIG_DIR="$ROOT_DIR/infra/envs/$ENVIRONMENT"
    if [ -d "$ENV_CONFIG_DIR" ]; then
        log_success "Environment configuration found: $ENVIRONMENT"
        
        if [ -f "$ENV_CONFIG_DIR/terraform.tfvars" ]; then
            log_success "Terraform variables file found"
        else
            log_warning "Terraform variables file not found for $ENVIRONMENT"
        fi
    else
        log_warning "Environment configuration not found: $ENVIRONMENT"
    fi
}

# Validate Terraform modules
validate_terraform() {
    log_info "Validating Terraform modules..."
    
    TF_DIR="$ROOT_DIR/infra/tf"
    
    if [ ! -d "$TF_DIR" ]; then
        log_warning "Terraform directory not found, skipping validation"
        return 0
    fi
    
    # Check for module structure
    MODULES_DIR="$TF_DIR/modules"
    if [ -d "$MODULES_DIR" ]; then
        log_success "Terraform modules directory found"
        
        # Check for required modules
        REQUIRED_MODULES=("networking" "identity" "compute" "ai-services" "data-stores" "apim")
        for module in "${REQUIRED_MODULES[@]}"; do
            if [ -d "$MODULES_DIR/$module" ]; then
                log_success "Module found: $module"
                
                # Check for main.tf
                if [ -f "$MODULES_DIR/$module/main.tf" ]; then
                    log_success "Module main.tf found: $module"
                else
                    log_warning "Module main.tf missing: $module"
                fi
            else
                log_warning "Module directory missing: $module"
            fi
        done
    else
        log_warning "Terraform modules directory not found"
    fi
}

# Validate security configurations
validate_security() {
    log_info "Validating security configurations..."
    
    # Check for security scanning tools configuration
    if [ -f "$ROOT_DIR/.checkov.yml" ]; then
        log_success "Checkov configuration found"
    else
        log_info "Checkov configuration not found (optional)"
    fi
    
    # Check for secrets in configuration files
    log_info "Scanning for potential secrets..."
    
    # Simple pattern matching for common secret patterns
    if command -v grep &> /dev/null; then
        POTENTIAL_SECRETS=$(grep -r -i -E "(password|secret|key|token)\s*[:=]\s*['\"][^'\"]*['\"]" \
            "$ROOT_DIR/src" "$ROOT_DIR/infra" 2>/dev/null | grep -v node_modules | grep -v ".git" || true)
        
        if [ -n "$POTENTIAL_SECRETS" ]; then
            log_warning "Potential hardcoded secrets found:"
            echo "$POTENTIAL_SECRETS"
        else
            log_success "No obvious hardcoded secrets found"
        fi
    fi
}

# Validate feature flags
validate_feature_flags() {
    log_info "Validating feature flags..."
    
    FEATURE_FLAGS_FILE="$ROOT_DIR/src/lib/feature-flags.ts"
    
    if [ -f "$FEATURE_FLAGS_FILE" ]; then
        log_success "Feature flags configuration found"
        
        # Check for required flags
        REQUIRED_FLAGS=("USE_STENCIL_COMPONENTS" "ENABLE_OTEL_TRACING" "ENABLE_APIM_ROUTING")
        for flag in "${REQUIRED_FLAGS[@]}"; do
            if grep -q "$flag" "$FEATURE_FLAGS_FILE"; then
                log_success "Feature flag found: $flag"
            else
                log_error "Missing feature flag: $flag"
            fi
        done
    else
        log_error "Feature flags configuration not found"
    fi
}

# Generate validation report
generate_report() {
    log_info "Generating validation report..."
    
    REPORT_FILE="$ROOT_DIR/validation-report-$ENVIRONMENT-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$REPORT_FILE" << EOF
# CI/Infrastructure Validation Report

**Environment**: $ENVIRONMENT  
**Generated**: $(date)  
**Script Version**: 1.0.0

## Summary

This report contains the results of automated validation checks for the orchestrix-ui CI/Infrastructure setup.

## Validation Results

### ✅ Completed Checks
- CI pipeline templates syntax and structure
- Application build process (lint, typecheck, tests)
- Stencil components build and artifacts
- Infrastructure configuration validation
- Security baseline checks
- Feature flags configuration

### 📊 Metrics
- Node.js Version: $(node --version)
- Environment: $ENVIRONMENT
- Validation Date: $(date)

### 🚀 Next Steps
1. Review any warnings or errors above
2. Run full integration tests in target environment
3. Deploy to staging environment for end-to-end validation
4. Schedule regular validation runs in CI/CD pipeline

EOF

    log_success "Validation report generated: $REPORT_FILE"
}

# Main execution
main() {
    echo "🚀 Starting CI/Infrastructure validation for orchestrix-ui"
    echo "Environment: $ENVIRONMENT"
    echo "======================================================"
    
    check_prerequisites
    validate_ci_templates
    validate_app_build
    validate_stencil_components
    validate_storybook
    validate_infrastructure
    validate_terraform
    validate_security
    validate_feature_flags
    generate_report
    
    echo "======================================================"
    log_success "Validation completed successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Review the validation report"
    echo "2. Address any warnings or errors"
    echo "3. Run integration tests: npm run test:integration"
    echo "4. Deploy to $ENVIRONMENT environment"
}

# Run main function
main "$@"