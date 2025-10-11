import type { NextRequest } from "next/server"
import { bus } from "./bus"
import { getSupabaseServer } from "@/lib/supabase/server"

type ChatMessage = {
  id: string
  user: { name: string }
  text: string
  at: number
  cid?: string
}

const encoder = new TextEncoder()
// In-memory store (ephemeral). Suitable for demo; for production use a queue/pubsub.
const clients = new Set<WritableStreamDefaultWriter<Uint8Array>>()
const messages: ChatMessage[] = []

function sseFormat(event: string, data: unknown) {
  return encoder.encode(`event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`)
}

function writeAll(event: string, data: unknown) {
  const payload = sseFormat(event, data)
  for (const client of Array.from(clients)) {
    client.write(payload).catch(() => {
      try {
        client.close()
      } catch {}
      clients.delete(client)
    })
  }
}

export async function GET(req: NextRequest) {
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
  const writer = writable.getWriter()
  clients.add(writer)

  bus.broadcast = (e, d) => writeAll(e, d)

  // Fetch latest messages for init
  let initMsgs: ChatMessage[] = []
  try {
    const supabase = getSupabaseServer()
    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, user_name, text, at, cid")
      .order("at", { ascending: true })
      .limit(200)
    if (error) {
      console.log("chat_messages table not found for SSE init, using in-memory:", error.message)
      initMsgs = bus.messages ?? []
    } else {
      initMsgs =
        (data || []).map((r) => ({
          id: r.id,
          user: { name: r.user_name },
          text: r.text,
          at: new Date(r.at).getTime(),
          cid: r.cid ?? undefined,
        })) ?? []
    }
  } catch (e: any) {
    console.log("SSE init error, using in-memory:", e.message)
    initMsgs = bus.messages ?? []
  }

  writer.write(sseFormat("init", { messages: initMsgs }))

  // Send current stats
  writer.write(sseFormat("stats", { online: clients.size }))

  // Heartbeat to keep connection alive
  const heartbeat = setInterval(() => {
    writer.write(encoder.encode(`:ping\n\n`)).catch(() => {
      clearInterval(heartbeat)
    })
  }, 15000)

  // On client disconnect
  const onAbort = () => {
    clearInterval(heartbeat)
    try {
      writer.close()
    } catch {}
    clients.delete(writer)
    writeAll("stats", { online: clients.size })
  }
  req.signal.addEventListener("abort", onAbort, { once: true })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}

export const dynamic = "force-dynamic"
