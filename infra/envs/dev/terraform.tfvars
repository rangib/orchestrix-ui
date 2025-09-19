# Development Environment Configuration
# This file contains environment-specific variables for the dev environment

# Resource naming
resource_prefix = "orchestrix-dev"
environment = "dev"

# App Service Configuration
app_service_sku = {
  size = "B1"
  tier = "Basic"
  capacity = 1
}

# OpenAI Configuration  
openai_sku = "S0"
chat_gpt_deployment_capacity = 10
embedding_deployment_capacity = 30

# Cosmos DB Configuration
cosmos_throughput = 400

# Search Service Configuration
search_service_sku = "basic"

# Storage Configuration
storage_account_tier = "Standard"
storage_replication = "LRS"

# Security Configuration
disable_local_auth = false  # Allow local auth in dev
use_private_endpoints = false  # Simplified networking in dev