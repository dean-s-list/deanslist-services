// app/perks/whitepaper/page.tsx

'use client'

import React from 'react'

export default function WhitepaperPage() {
  return (
    <div style={{ width: '100%', height: '100vh', padding: '1rem' }}>
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(
          'https://drive.google.com/uc?export=download&id=1_x2rvT4BaZOMU0zDvzKHv1dADDegmYJF'
        )}&embedded=true`}
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />

    </div>
  )
}
