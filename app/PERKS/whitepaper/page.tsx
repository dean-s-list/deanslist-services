// app/perks/whitepaper/page.tsx

'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WhitepaperRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('https://drive.google.com/file/d/1zmdOe4AkauvIVTk5F5DHl4e_ocNBvkJE/view?usp=sharing')
  }, [router])

  return null
}
