"use client"

import { useEffect, useRef, type PropsWithChildren } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type MotionProps = {
  className?: string
  // animation options
  y?: number
  duration?: number
  delay?: number
  staggerChildren?: number
}

export function MotionFadeIn({
  children,
  className,
  y = 12,
  duration = 0.6,
  delay = 0,
}: PropsWithChildren<MotionProps>) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    gsap.set(el, { opacity: 0, y })
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })
    }, el)
    return () => ctx.revert()
  }, [y, duration, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function MotionStagger({
  children,
  className,
  y = 14,
  duration = 0.55,
  delay = 0,
  staggerChildren = 0.06,
}: PropsWithChildren<MotionProps>) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const items = Array.from(el.children) as HTMLElement[]
    gsap.set(items, { opacity: 0, y })
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: staggerChildren,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      })
    }, el)
    return () => ctx.revert()
  }, [y, duration, delay, staggerChildren])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
