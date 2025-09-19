# UAT Environment Configuration
# This file contains environment-specific variables for the UAT environment

# Resource naming
resource_prefix = "orchestrix-uat"
environment = "uat"

# App Service Configuration
app_service_sku = {
  size = "P1v2"
  tier = "PremiumV2"
  capacity = 1
}

# OpenAI Configuration  
openai_sku = "S0"
chat_gpt_deployment_capacity = 20
embedding_deployment_capacity = 60

# Cosmos DB Configuration
cosmos_throughput = 800

# Search Service Configuration
search_service_sku = "standard"

# Storage Configuration
storage_account_tier = "Standard"
storage_replication = "ZRS"

# Security Configuration
disable_local_auth = true   # Use managed identities
use_private_endpoints = true  # Secure networking