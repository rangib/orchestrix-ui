import { rest } from 'msw'

export const handlers = [
  // Health check endpoint
  rest.get('http://localhost:3000/api/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 'ok' }))
  }),

  // Chat API mock
  rest.post('http://localhost:3000/api/chat', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'mock-chat-id',
        message: 'Mock response from AI',
        timestamp: new Date().toISOString()
      })
    )
  }),

  // Document API mock
  rest.post('http://localhost:3000/api/document', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'mock-doc-id',
        processed: true,
        extractedText: 'Mock extracted text from document'
      })
    )
  }),

  // Images API mock
  rest.post('http://localhost:3000/api/images', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'mock-image-id',
        url: 'https://mock-image-url.com/image.jpg',
        generated: true
      })
    )
  }),

  // Auth callback mock
  rest.get('http://localhost:3000/api/auth/callback/*', (req, res, ctx) => {
    return res(
      ctx.status(302),
      ctx.set('Location', '/')
    )
  }),

  // NextAuth session mock
  rest.get('http://localhost:3000/api/auth/session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 'mock-user-id',
          name: 'Mock User',
          email: 'mock@example.com',
          isAdmin: false
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      })
    )
  })
]
