'use client'

import { useState, useCallback } from 'react'
import { ChatMessage } from '@/shared/utils/validation'

/**
 * Client-side chat state management hook
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      content,
      role: 'user',
      timestamp: new Date(),
    }

    addMessage(userMessage)
    setIsLoading(true)
    setError(null)

    try {
      // This would be implemented with actual API call
      // For now, just simulate a response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          content: `Echo: ${content}`,
          role: 'assistant',
          timestamp: new Date(),
        }
        addMessage(assistantMessage)
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }, [addMessage])

  return {
    messages,
    isLoading,
    error,
    addMessage,
    clearMessages,
    sendMessage,
  }
}