# Terraform Migration Plan

## Overview
This document outlines the migration strategy from Azure Bicep to Terraform for the orchestrix-ui infrastructure.

## Current State (Bicep)
- `infra/main.bicep` - Main entry point with subscription scope
- `infra/resources.bicep` - Core resources definition
- `infra/private_endpoints_*.bicep` - Network isolation components

## Target State (Terraform)
The Terraform implementation will be organized into modular structure:

### Module Structure
```
infra/tf/
├── modules/
│   ├── networking/     # VNet, subnets, NSGs, private endpoints
│   ├── identity/       # App registrations, managed identities, RBAC
│   ├── compute/        # App Service plans, web apps
│   ├── ai-services/    # OpenAI, Cognitive Services, Search
│   ├── data-stores/    # Cosmos DB, Storage Account, Key Vault
│   └── apim/          # API Management (new)
├── environments/
│   ├── dev/
│   ├── uat/
│   └── prod/
└── shared/
    ├── providers.tf
    ├── variables.tf
    └── outputs.tf
```

## Migration Mapping

### Current Bicep Resources → Terraform Modules

#### main.bicep Parameters
| Bicep Parameter | Terraform Variable | Module | Notes |
|---|---|---|---|
| `disableLocalAuth` | `disable_local_auth` | identity | Boolean flag for RBAC enforcement |
| `usePrivateEndpoints` | `use_private_endpoints` | networking | Network isolation control |
| `name` | `environment_name` | shared | Environment naming |
| `location` | `location` | shared | Primary region |

#### Networking Module (from private_endpoints_*.bicep)
- Virtual Network and subnets
- Network Security Groups
- Private DNS zones
- Private endpoints for all services

#### Identity Module
- **Two App Registrations** (NEW):
  - NextAuth app registration for user authentication
  - Service-to-service app registration for API communication
- Managed Identity for App Service
- RBAC role assignments

#### Compute Module (from resources.bicep app service)
- App Service Plan
- App Service with system-assigned managed identity
- Application settings injection from Key Vault

#### AI Services Module
- OpenAI accounts (chat + DALL-E)
- Cognitive Services (Form Recognizer, Speech)
- Azure AI Search service

#### Data Stores Module
- Cosmos DB account with containers
- Storage Account with containers
- Key Vault with secrets

#### APIM Module (NEW)
- API Management service
- API definitions for all endpoints
- Policies for authentication and routing

## Environment-Specific Configurations

### Dev Environment (`infra/envs/dev/terraform.tfvars`)
```hcl
environment_name = "orchestrix-dev"
location = "eastus"
app_service_plan_sku = "B1"
cosmos_throughput = 400
openai_sku = "S0"
use_private_endpoints = false
disable_local_auth = false
```

### UAT Environment (`infra/envs/uat/terraform.tfvars`)
```hcl
environment_name = "orchestrix-uat"
location = "eastus"
app_service_plan_sku = "S1"
cosmos_throughput = 1000
openai_sku = "S0"
use_private_endpoints = true
disable_local_auth = true
```

### Production Environment (`infra/envs/prod/terraform.tfvars`)
```hcl
environment_name = "orchestrix-prod"
location = "eastus"
app_service_plan_sku = "P1v3"
cosmos_throughput = 4000
openai_sku = "S0"
use_private_endpoints = true
disable_local_auth = true
```

## Migration Process

1. **Phase 1: Module Development**
   - Create base Terraform modules
   - Implement one-to-one resource mapping
   - Add APIM and two-app-registration extensions

2. **Phase 2: Environment Configuration**
   - Create environment-specific variable files
   - Test infrastructure provisioning in dev environment

3. **Phase 3: Validation & Testing**
   - Compare Terraform and Bicep outputs
   - Validate application functionality with TF infrastructure
   - Performance and security testing

4. **Phase 4: Migration Execution**
   - Blue-green deployment approach
   - Gradual migration: dev → uat → prod
   - Rollback plans for each environment

## Key Differences from Current Bicep

### New Components
1. **API Management**: Centralized API routing and security
2. **Two App Registrations**: Separate auth contexts for user vs service
3. **Enhanced Monitoring**: OpenTelemetry configuration

### Enhanced Configuration
- Environment-specific scaling parameters
- Advanced networking options
- Improved secret management

## Acceptance Criteria
- [ ] All current Bicep resources have Terraform equivalents
- [ ] Output values match between Bicep and Terraform
- [ ] Application deploys and functions identically
- [ ] Security posture is maintained or improved
- [ ] Cost analysis shows no unexpected increases