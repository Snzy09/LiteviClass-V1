import { SiteHeader } from "@/components/site-header"
import { MotionFadeIn } from "@/components/motion"
import { Card } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner"
import { AnonChat } from "@/components/anon-chat"

export default function ChatPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-10">
        <MotionFadeIn>
          <h1 className="text-balance text-3xl font-bold leading-tight md:text-4xl">Litevi Chat</h1>
          <p className="mt-2 text-muted-foreground">
            Ngobrol bebas dan anonim dengan teman-teman. Tetap santun dan sopan ya!
          </p>
        </MotionFadeIn>
        <Card className="mt-6 border-border/60 bg-card">
          <AnonChat />
        </Card>
      </main>
      <Toaster richColors />
    </>
  )
}
