// This file is imported by stream route to attach broadcast to the global bus so send route can use it.

type ChatMessage = {
  id: string
  user: { name: string }
  text: string
  at: number
  cid?: string
}

type Bus = {
  messages: ChatMessage[]
  broadcast?: (event: string, data: unknown) => void
}

const g = globalThis as any
if (!g.__ANON_CHAT_BUS__) {
  g.__ANON_CHAT_BUS__ = { messages: [] } as Bus
}
export const bus: Bus = g.__ANON_CHAT_BUS__
