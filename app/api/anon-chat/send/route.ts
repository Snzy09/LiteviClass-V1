import type { NextRequest } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

// share the same module instance as stream route by re-declaring and relying on module caching isn't guaranteed,
// so we keep a tiny local event bus via globalThis for demo.
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

// initialize global bus once
const g = globalThis as any
if (!g.__ANON_CHAT_BUS__) {
  g.__ANON_CHAT_BUS__ = { messages: [] } as Bus
}
const bus: Bus = g.__ANON_CHAT_BUS__

// Lazy link to stream broadcaster, if present
function broadcast(event: string, data: unknown) {
  // The stream route sets a broadcaster on the same global bus when first loaded.
  if (typeof bus.broadcast === "function") bus.broadcast(event, data)
}

export async function POST(req: NextRequest) {
  const { name, text, cid } = (await req.json()) as { name?: string; text?: string; cid?: string }

  const cleanName = String(name ?? "")
    .slice(0, 40)
    .trim()
  const cleanText = String(text ?? "")
    .slice(0, 500)
    .trim()

  if (!cleanName || !cleanText) {
    return Response.json({ ok: false, error: "Nama dan pesan wajib diisi." }, { status: 400 })
  }

  let msg: ChatMessage

  try {
    const supabase = getSupabaseServer()
    const { data, error } = await supabase
      .from("chat_messages")
      .insert({ user_name: cleanName, text: cleanText, cid })
      .select("id, at")
      .single()

    if (error) {
      console.log("chat_messages insert failed, using in-memory:", error.message)
      // Fallback to in-memory
      msg = {
        id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        user: { name: cleanName },
        text: cleanText,
        at: Date.now(),
        cid,
      }
    } else {
      msg = {
        id: data.id,
        user: { name: cleanName },
        text: cleanText,
        at: new Date(data.at).getTime(),
        cid,
      }
    }
  } catch (e: any) {
    console.log("POST /api/anon-chat/send error, using in-memory:", e.message)
    // Fallback to in-memory
    msg = {
      id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      user: { name: cleanName },
      text: cleanText,
      at: Date.now(),
      cid,
    }
  }

  // store bounded history
  bus.messages.push(msg)
  if (bus.messages.length > 200) bus.messages.splice(0, bus.messages.length - 200)

  // broadcast to connected clients (if any)
  broadcast("message", msg)

  return Response.json({ ok: true })
}

export const dynamic = "force-dynamic"
