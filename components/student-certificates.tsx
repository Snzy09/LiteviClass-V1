"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Certificate } from "@/data/students"

export function StudentCertificates({ certificates }: { certificates: Certificate[] }) {
  if (!certificates?.length) return null

  return (
    null
  )
}
