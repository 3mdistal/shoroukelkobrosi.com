'use client'

import React from 'react'
import Image from 'next/image'
import styles from './site-title.module.css'

export default function SiteTitle() {
  return (
    <div className={styles.heroTitle}>
      <div className={styles.logoBig}>
        <Image src="/logo2.webp" alt="Anthropotpourri" width={800} height={800} priority />
      </div>
      <h1 className={styles.title}>
        Anthropotpourri
        <span className={styles.subtitle}>Cinematography of Shorouk Elkobrosi</span>
      </h1>
    </div>
  )
}
