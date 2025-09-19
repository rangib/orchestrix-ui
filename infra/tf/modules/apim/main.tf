# APIM Module - API Management Service
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

variable "environment_name" {
  description = "Environment name used for resource naming"
  type        = string
}

variable "location" {
  description = "Azure region for resources"
  type        = string
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "app_service_url" {
  description = "App Service URL for backend routing"
  type        = string
}

variable "nextauth_client_id" {
  description = "NextAuth app registration client ID"
  type        = string
}

variable "service_client_id" {
  description = "Service app registration client ID"
  type        = string
}

variable "tenant_id" {
  description = "Azure AD tenant ID"
  type        = string
}

variable "apim_sku" {
  description = "APIM SKU tier"
  type        = string
  default     = "Developer"
}

# API Management Service
resource "azurerm_api_management" "main" {
  name                = "${var.environment_name}-apim"
  location            = var.location
  resource_group_name = var.resource_group_name
  publisher_name      = "Orchestrix Team"
  publisher_email     = "admin@orchestrix.io"

  sku_name = var.apim_sku

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = var.environment_name
    Module      = "apim"
  }
}

# Chat API
resource "azurerm_api_management_api" "chat_api" {
  name                = "chat-api"
  resource_group_name = var.resource_group_name
  api_management_name = azurerm_api_management.main.name
  revision            = "1"
  display_name        = "Chat API"
  path                = "chat"
  protocols           = ["https"]
  service_url         = "https://${var.app_service_url}/api"
  subscription_required = false
}

# Chat POST Operation
resource "azurerm_api_management_api_operation" "chat_post" {
  operation_id        = "post-chat"
  api_name           = azurerm_api_management_api.chat_api.name
  api_management_name = azurerm_api_management.main.name
  resource_group_name = var.resource_group_name
  display_name       = "Send Chat Message"
  method             = "POST"
  url_template       = "/chat"
}

# JWT Validation Policy
resource "azurerm_api_management_api_operation_policy" "chat_post_policy" {
  api_name            = azurerm_api_management_api.chat_api.name
  api_management_name = azurerm_api_management.main.name
  resource_group_name = var.resource_group_name
  operation_id        = azurerm_api_management_api_operation.chat_post.operation_id

  xml_content = <<XML
<policies>
  <inbound>
    <validate-jwt header-name="Authorization" failed-validation-httpcode="401">
      <openid-config url="https://login.microsoftonline.com/${var.tenant_id}/v2.0/.well-known/openid_configuration" />
      <audiences>
        <audience>${var.nextauth_client_id}</audience>
      </audiences>
      <issuers>
        <issuer>https://login.microsoftonline.com/${var.tenant_id}/v2.0</issuer>
      </issuers>
    </validate-jwt>
    <authentication-managed-identity resource="api://${var.service_client_id}" />
    <set-backend-service base-url="https://${var.app_service_url}" />
  </inbound>
  <backend>
    <forward-request />
  </backend>
  <outbound />
  <on-error />
</policies>
XML
}

# Document API
resource "azurerm_api_management_api" "document_api" {
  name                = "document-api"
  resource_group_name = var.resource_group_name
  api_management_name = azurerm_api_management.main.name
  revision            = "1"
  display_name        = "Document API"
  path                = "document"
  protocols           = ["https"]
  service_url         = "https://${var.app_service_url}/api"
  subscription_required = false
}

# Images API
resource "azurerm_api_management_api" "images_api" {
  name                = "images-api"
  resource_group_name = var.resource_group_name
  api_management_name = azurerm_api_management.main.name
  revision            = "1"
  display_name        = "Images API"
  path                = "images"
  protocols           = ["https"]
  service_url         = "https://${var.app_service_url}/api"
  subscription_required = false
}

# Output values
output "apim_gateway_url" {
  description = "APIM Gateway URL"
  value       = "https://${azurerm_api_management.main.gateway_url}"
}

output "apim_name" {
  description = "APIM service name"
  value       = azurerm_api_management.main.name
}

output "apim_identity_principal_id" {
  description = "APIM managed identity principal ID"
  value       = azurerm_api_management.main.identity[0].principal_id
}