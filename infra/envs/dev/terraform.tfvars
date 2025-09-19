environment_name = "orchestrix-dev"
location = "eastus"

# Networking
use_private_endpoints = false

# Authentication
disable_local_auth = false

# Compute
app_service_plan_sku = "B1"

# Data
cosmos_throughput = 400
cosmos_autoscale_max = 1000

# AI Services
openai_sku = "S0"
openai_capacity = 10
dalle_capacity = 2

# Search
search_sku = "basic"
search_replica_count = 1
search_partition_count = 1

# Storage
storage_account_tier = "Standard"
storage_replication = "LRS"

# APIM
apim_sku = "Developer"

# Monitoring
enable_application_insights = true
log_retention_days = 30

# Feature flags
enable_apim_routing = false
enable_otel_tracing = true

# Tags
tags = {
  Environment = "development"
  Project     = "orchestrix-ui"
  ManagedBy   = "terraform"
}