'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { timelineValues } from '@/components/homepage/hero/animation-timeline'
import styles from './site-title.module.css'

export default function SiteTitle() {
  return (
    <motion.div
      initial={{ scale: 1.1, y: 100 }}
      animate={{ scale: 1, y: 75 }}
      transition={{
        duration: timelineValues.fadeDuration,
        delay: timelineValues.reelDelay,
      }}
    >
      <div className={styles.heroTitle}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: timelineValues.fadeDuration,
            ease: 'easeOut',
          }}
        >
          <div className={styles.logoBig}>
            <Image src="/logo2.webp" alt="Anthropotpourri" width={800} height={800} priority />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: timelineValues.fadeDuration,
            delay: timelineValues.titleDelay,
            ease: 'easeOut',
          }}
        >
          <h1 className={styles.title}>Anthropotpourri</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: timelineValues.fadeDuration,
            delay: timelineValues.subtitleDelay,
            ease: 'easeOut',
          }}
        >
          <p className={styles.subtitle}>Cinematography of Shorouk Elkobrosi</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
