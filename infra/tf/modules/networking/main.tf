# Networking Module - VNet, Subnets, Private Endpoints
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

variable "use_private_endpoints" {
  description = "Enable private endpoints for services"
  type        = bool
  default     = false
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

# Virtual Network
resource "azurerm_virtual_network" "main" {
  count               = var.use_private_endpoints ? 1 : 0
  name                = "${var.environment_name}-vnet"
  location            = var.location
  resource_group_name = var.resource_group_name
  address_space       = ["10.0.0.0/16"]

  tags = {
    Environment = var.environment_name
    Module      = "networking"
  }
}

# App Service Subnet
resource "azurerm_subnet" "app_service" {
  count                = var.use_private_endpoints ? 1 : 0
  name                 = "app-service-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.main[0].name
  address_prefixes     = ["10.0.1.0/24"]

  delegation {
    name = "app-service-delegation"
    service_delegation {
      name    = "Microsoft.Web/serverFarms"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }
}

# Private Endpoints Subnet
resource "azurerm_subnet" "private_endpoints" {
  count                = var.use_private_endpoints ? 1 : 0
  name                 = "private-endpoints-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.main[0].name
  address_prefixes     = ["10.0.2.0/24"]
}

# Network Security Group
resource "azurerm_network_security_group" "app_service" {
  count               = var.use_private_endpoints ? 1 : 0
  name                = "${var.environment_name}-app-nsg"
  location            = var.location
  resource_group_name = var.resource_group_name

  security_rule {
    name                       = "allow-https-inbound"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = {
    Environment = var.environment_name
    Module      = "networking"
  }
}

# Output values
output "vnet_id" {
  description = "Virtual network ID"
  value       = var.use_private_endpoints ? azurerm_virtual_network.main[0].id : null
}

output "app_service_subnet_id" {
  description = "App Service subnet ID"
  value       = var.use_private_endpoints ? azurerm_subnet.app_service[0].id : null
}

output "private_endpoints_subnet_id" {
  description = "Private endpoints subnet ID"
  value       = var.use_private_endpoints ? azurerm_subnet.private_endpoints[0].id : null
}