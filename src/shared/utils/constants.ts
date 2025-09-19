/**
 * Application-wide constants
 */

export const APP_NAME = 'OrchestrixUI' as const
export const API_BASE_URL = '/api' as const

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  AUTH: '/auth',
  EXTENSIONS: '/extensions',
  PERSONAS: '/personas',
  PROMPTS: '/prompts',
  REPORTING: '/reporting',
} as const

export const AZURE_SERVICES = {
  OPENAI: 'azure-openai',
  COSMOS_DB: 'cosmos-db',
  KEY_VAULT: 'key-vault',
  STORAGE: 'azure-storage',
  AI_SEARCH: 'ai-search',
  DOCUMENT_INTELLIGENCE: 'document-intelligence',
} as const

export const CHAT_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const