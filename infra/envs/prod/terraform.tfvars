environment_name = "orchestrix-prod"
location = "eastus"

# Networking
use_private_endpoints = true

# Authentication
disable_local_auth = true

# Compute
app_service_plan_sku = "P1v3"

# Data
cosmos_throughput = 4000
cosmos_autoscale_max = 40000

# AI Services
openai_sku = "S0"
openai_capacity = 240
dalle_capacity = 10

# Search
search_sku = "standard"
search_replica_count = 3
search_partition_count = 1

# Storage
storage_account_tier = "Standard"
storage_replication = "ZRS"

# APIM
apim_sku = "Standard"

# Monitoring
enable_application_insights = true
log_retention_days = 90

# Feature flags
enable_apim_routing = true
enable_otel_tracing = true

# Tags
tags = {
  Environment = "production"
  Project     = "orchestrix-ui"
  ManagedBy   = "terraform"
  Compliance  = "required"
}