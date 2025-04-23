// app/perks/whitepaper/page.tsx

'use client'

import React from 'react'

export default function WhitepaperPage() {
  return (
<iframe
  src="/Whitepaper.pdf"
  width="100%"
  height="100%"
  style={{border: "none;"}}
>
  This browser does not support PDFs. Please download the PDF to view it: 
  <a href="/whitepaper.pdf">Download PDF</a>
</iframe>

  )
}