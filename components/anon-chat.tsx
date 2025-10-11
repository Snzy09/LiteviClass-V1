"use client"

import type React from "react"
import type { JSX } from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { MotionStagger } from "@/components/motion"
import { AnimatePresence, motion } from "framer-motion"
import { defaultClassConfig, type ClassConfig } from "@/lib/class-config"
import { Skeleton } from "@/components/ui/skeleton"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Paperclip, Smile, Mic, Send } from "lucide-react"

type ChatMessage = {
  id: string
  user: { name: string }
  text: string
  at: number
  cid?: string
}

function getStoredName() {
  if (typeof window === "undefined") return "Anon-" + Math.random().toString(36).slice(2, 6)
  const saved = localStorage.getItem("anon_name")
  if (saved) return saved
  const adjectives = ["Pocil", "Tanker"]
  const animals = ["GEBRAN", "BOLON"]
  const name = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}-${Math.floor(Math.random() * 90 + 10)}`
  localStorage.setItem("anon_name", name)
  return name
}

export function AnonChat() {
  const [name, setName] = useState<string>(() => getStoredName())
  const [text, setText] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [online, setOnline] = useState<number>(1)
  const [connected, setConnected] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [emojiOpen, setEmojiOpen] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  // typing indicator state
  const typing = text.trim().length > 0

  const [cfg, setCfg] = useState<ClassConfig>(defaultClassConfig)
  const [cfgHydrated, setCfgHydrated] = useState(false)
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("classConfigOverrides") : null
      if (raw) {
        const overrides = JSON.parse(raw) as Partial<ClassConfig>
        setCfg({ ...defaultClassConfig, ...overrides })
      } else {
        setCfg(defaultClassConfig)
      }
    } catch {
      setCfg(defaultClassConfig)
    } finally {
      setCfgHydrated(true)
    }
  }, [])

  useEffect(() => {
    // fetch initial history
    fetch("/api/anon-chat/history")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.messages)) {
          setMessages(d.messages)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const es = new EventSource("/api/anon-chat/stream")
    es.addEventListener("init", (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data)
        if (Array.isArray(data.messages)) {
          setMessages((prev) => {
            // merge, avoid duplicates by id
            const map = new Map(prev.map((m) => [m.id, m]))
            for (const m of data.messages as ChatMessage[]) {
              if (!map.has(m.id)) map.set(m.id, m)
            }
            return Array.from(map.values()).sort((a, b) => a.at - b.at)
          })
        }
      } catch {}
    })
    es.addEventListener("stats", (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data)
        if (typeof data.online === "number") setOnline(data.online)
      } catch {}
    })
    es.addEventListener("message", (e) => {
      try {
        const msg = JSON.parse((e as MessageEvent).data) as ChatMessage
        setMessages((prev) => {
          // already have final by id -> ignore
          if (prev.some((p) => p.id === msg.id)) return prev
          if (msg.cid) {
            const idx = prev.findIndex((p) => p.cid && p.cid === msg.cid)
            if (idx >= 0) {
              const next = prev.slice()
              next[idx] = msg
              return next
            }
          }
          return [...prev, msg]
        })
      } catch {}
    })
    es.onopen = () => {
      setConnected(true)
      toast.success("Terhubung ke chat")
    }
    es.onerror = () => {
      setConnected(false)
      // Don't spam errors; just mark disconnected
    }
    return () => {
      es.close()
    }
  }, [])

  // auto scroll to bottom on new message
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // smooth scroll
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages.length])

  useEffect(() => {
    const ta = inputRef.current
    if (!ta) return
    ta.style.height = "0px"
    const max = 160 // ~10 lines max
    ta.style.height = Math.min(ta.scrollHeight, max) + "px"
  }, [text])

  const send = async () => {
    const payload = text.trim()
    if (!payload) return
    const currentName = name.trim() || getStoredName()
    setName(currentName)
    localStorage.setItem("anon_name", currentName)

    const cid = `cid-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    const optimistic: ChatMessage = {
      id: `opt-${cid}`,
      cid,
      user: { name: currentName },
      text: payload,
      at: Date.now(),
    }
    setMessages((prev) => [...prev, optimistic])
    setText("")

    try {
      const res = await fetch("/api/anon-chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: currentName, text: payload, cid }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setMessages((prev) => prev.filter((m) => m.cid !== cid))
        toast.error(j?.error ?? "Gagal mengirim pesan")
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.cid !== cid))
      toast.error("Koneksi terputus. Coba lagi.")
    } finally {
      inputRef.current?.focus()
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const emojis = useMemo(
    () => [
      "😀",
      "😁",
      "😂",
      "🤣",
      "😊",
      "😍",
      "🤩",
      "🤗",
      "😎",
      "😇",
      "😉",
      "🥳",
      "🤔",
      "🙏",
      "👍",
      "👏",
      "🔥",
      "🎉",
      "❤️",
      "✨",
    ],
    [],
  )

  const insertAtCursor = (snippet: string) => {
    const ta = inputRef.current
    if (!ta) {
      setText((t) => t + snippet)
      return
    }
    const start = ta.selectionStart ?? text.length
    const end = ta.selectionEnd ?? text.length
    const next = text.slice(0, start) + snippet + text.slice(end)
    setText(next)
    requestAnimationFrame(() => {
      ta.focus()
      try {
        ta.selectionStart = ta.selectionEnd = start + snippet.length
      } catch {}
    })
  }

  const confirmImage = () => {
    const url = imageUrl.trim()
    // naive validation for common image extensions
    if (!/^https?:\/\/\S+\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)(\?\S*)?$/i.test(url)) {
      toast.error("Masukkan URL gambar yang valid (http/https).")
      return
    }
    insertAtCursor(` [[image:${url}]] `)
    setImageUrl("")
    setImageOpen(false)
  }

  const timeFmt = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [],
  )

  const renderMessage = (txt: string) => {
    const parts: Array<JSX.Element | string> = []
    const re = /\[\[image:(https?:\/\/[^\]\s]+)\]\]/g
    let last = 0
    let match: RegExpExecArray | null
    while ((match = re.exec(txt)) !== null) {
      const before = txt.slice(last, match.index)
      if (before) parts.push(before)
      const url = match[1]
      parts.push(
        <img
          key={match.index}
          src={url || "/placeholder.svg"}
          alt="Gambar terkirim"
          className="mt-1 max-h-64 w-auto max-w-full rounded-md object-cover"
          crossOrigin="anonymous"
        />,
      )
      last = re.lastIndex
    }
    const rest = txt.slice(last)
    if (rest) parts.push(rest)
    return <div className="text-sm leading-relaxed break-words">{parts}</div>
  }

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="px-3 py-2 md:px-4 md:py-3"
      >
        {!cfgHydrated ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium">{cfg.schoolName}</span>
            <Badge variant="secondary" className="animate-pulse">
              {cfg.className}
            </Badge>
          </div>
        )}
      </motion.div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2 md:px-4 md:py-3">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn("h-2.5 w-2.5 rounded-full", connected ? "bg-primary" : "bg-muted-foreground")}
            aria-hidden
          />
          <div className="text-sm text-muted-foreground">Status</div>
          <Badge variant="secondary" className="ml-2">
            {connected ? "Terhubung" : "Terputus"}
          </Badge>
        </div>
        <motion.div
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="text-sm text-muted-foreground"
        >
          Online: <Badge className="ml-1">{online}</Badge>
        </motion.div>
      </div>

      {/* Messages */}
      <MotionStagger className="relative">
        <div
          ref={scrollRef}
          className="h-[62vh] md:h-[68vh] overflow-y-auto px-2 py-3 md:px-3 md:py-4"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          <div className="space-y-2 md:space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m) => {
                const mine = m.user?.name === name
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className={cn("flex items-end", mine ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] md:max-w-[70%] rounded-2xl border px-3.5 py-2.5 shadow-sm",
                        mine
                          ? "bg-primary text-primary-foreground border-primary/60"
                          : "bg-muted text-foreground border-border/60",
                      )}
                    >
                      <div className={cn("mb-1 flex items-center gap-2 text-[11px] leading-none opacity-80")}>
                        <span className={cn(mine ? "text-primary-foreground" : "text-muted-foreground")}>
                          {m.user?.name ?? "Anon"}
                        </span>
                        <span>•</span>
                        <time className={cn(mine ? "text-primary-foreground/80" : "text-muted-foreground")}>
                          {timeFmt.format(new Date(m.at))}
                        </time>
                      </div>
                      {renderMessage(m.text)}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
        </div>
      </MotionStagger>

      {/* Composer */}
      <div className="sticky bottom-0 border-t border-border/60 bg-card/80 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-card/70 md:px-3 md:py-3">
        <InputGroup className="bg-background/60">
          <InputGroupAddon align="inline-start" className="gap-1 px-2">
            <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
              <PopoverTrigger asChild>
                <InputGroupButton size="icon-xs" aria-label="Emoji">
                  <Smile className="size-4" />
                </InputGroupButton>
              </PopoverTrigger>
              <PopoverContent align="start" side="top" className="w-[240px] p-2">
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((e) => (
                    <button
                      key={e}
                      type="button"
                      className="h-8 w-8 rounded-md text-lg hover:bg-muted"
                      aria-label={`Emoji ${e}`}
                      onClick={() => {
                        insertAtCursor(e)
                        setEmojiOpen(false)
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Dialog open={imageOpen} onOpenChange={setImageOpen}>
              <DialogTrigger asChild>
                <InputGroupButton size="icon-xs" aria-label="Lampirkan gambar">
                  <Paperclip className="size-4" />
                </InputGroupButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Lampirkan Gambar</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://contoh.com/foto.jpg"
                    inputMode="url"
                    aria-label="URL gambar"
                  />
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setImageOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={confirmImage}>Tambahkan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </InputGroupAddon>

          <InputGroupTextarea
            ref={inputRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Tulis pesan anonim... (Enter untuk kirim • Shift+Enter baris baru)"
            aria-label="Ketik pesan"
            className="max-h-40 resize-none overflow-y-auto"
          />

          <InputGroupAddon align="inline-end" className="gap-1 px-2">
            <InputGroupButton
              size="icon-xs"
              aria-label="Rekam suara"
              onClick={() => toast.message("Voice note akan hadir segera")}
            >
              <Mic className="size-4" />
            </InputGroupButton>
            <InputGroupButton size="icon-xs" aria-label="Kirim pesan" disabled={!text.trim()} onClick={send}>
              <Send className="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {/* Typing indicator */}
        <div className="pointer-events-none mt-2 h-5">
          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1 text-xs text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <span>Mengetik</span>
                <span className="inline-flex gap-1">
                  <i className="dot" />
                  <i className="dot delay-1" />
                  <i className="dot delay-2" />
                </span>
                <style jsx>{`
                  .dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 9999px;
                    background: var(--muted-foreground);
                    display: inline-block;
                    animation: blink 1.1s infinite ease-in-out;
                  }
                  .delay-1 { animation-delay: 0.15s; }
                  .delay-2 { animation-delay: 0.3s; }
                  @keyframes blink {
                    0%, 80%, 100% { opacity: 0.2; transform: translateY(0px); }
                    40% { opacity: 1; transform: translateY(-2px); }
                  }
                `}</style>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Name editor */}
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Nama:</span>
          <Badge variant="outline">{name}</Badge>
          <button
            onClick={() => {
              const n = prompt("Ganti nama anonim kamu:", name || "")?.trim()
              if (n) {
                setName(n)
                localStorage.setItem("anon_name", n)
                toast.info("Nama diperbarui")
              }
            }}
            className="rounded-md px-2 py-1 text-xs underline-offset-2 hover:underline"
          >
            Ubah
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="border-t border-border/60 px-3 py-3 text-center text-xs text-muted-foreground md:px-4"
      >
        {!cfgHydrated ? <Skeleton className="mx-auto h-3 w-64" /> : <span>{cfg.footerText}</span>}
      </motion.div>
    </div>
  )
}
