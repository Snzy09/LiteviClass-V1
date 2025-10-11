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
const bus: Bus = g.__ANON_CHAT_BUS__

// Import Supabase server function
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Fetch chat history from Supabase DB
    const supabase = getSupabaseServer()
    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, user_name, text, at, cid")
      .order("at", { ascending: true })
      .limit(200)
    if (error) {
      console.log("chat_messages table not found, using in-memory:", error.message)
      return Response.json({ messages: bus.messages ?? [] })
    }
    const messages = (data || []).map((r) => ({
      id: r.id,
      user: { name: r.user_name },
      text: r.text,
      at: new Date(r.at).getTime(),
      cid: r.cid ?? undefined,
    }))
    return Response.json({ messages })
  } catch (e: any) {
    console.log("GET /api/anon-chat/history error, using in-memory:", e.message)
    return Response.json({ messages: bus.messages ?? [] })
  }
}

export const dynamic = "force-dynamic"
