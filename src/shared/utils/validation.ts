import { z } from 'zod'

/**
 * Common validation schemas used across features
 */
export const EmailSchema = z.string().email()
export const RequiredStringSchema = z.string().min(1, 'This field is required')

/**
 * Chat message validation
 */
export const ChatMessageSchema = z.object({
  content: RequiredStringSchema,
  role: z.enum(['user', 'assistant', 'system']),
  timestamp: z.date().optional(),
})

export type ChatMessage = z.infer<typeof ChatMessageSchema>