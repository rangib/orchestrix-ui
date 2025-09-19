# Production Environment Configuration
# This file contains environment-specific variables for the production environment

# Resource naming
resource_prefix = "orchestrix-prod"
environment = "prod"

# App Service Configuration
app_service_sku = {
  size = "P2v2"
  tier = "PremiumV2"
  capacity = 2
}

# OpenAI Configuration  
openai_sku = "S0"
chat_gpt_deployment_capacity = 30
embedding_deployment_capacity = 120

# Cosmos DB Configuration
cosmos_throughput = 1000

# Search Service Configuration
search_service_sku = "standard"

# Storage Configuration
storage_account_tier = "Premium"
storage_replication = "GRS"

# Security Configuration
disable_local_auth = true   # Use managed identities only
use_private_endpoints = true  # Full network isolation

# Monitoring and logging
enable_monitoring = true
log_retention_days = 90