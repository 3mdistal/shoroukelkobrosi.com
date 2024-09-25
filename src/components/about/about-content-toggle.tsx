'use client'

import { useState } from 'react'
import styles from './about-content-toggle.module.css'

interface AboutContentToggleProps {
  aboutHeading: React.ReactNode
  personalIntro: React.ReactNode
  professionalIntro: React.ReactNode
  personalPhoto: React.ReactNode
  professionalPhoto: React.ReactNode
  professionalLogos: React.ReactNode
}

export default function AboutContentToggle({
  aboutHeading,
  personalIntro,
  professionalIntro,
  personalPhoto,
  professionalPhoto,
  professionalLogos,
}: AboutContentToggleProps): React.ReactElement {
  const [isPersonal, setIsPersonal] = useState(true)

  const toggleContent = (): void => {
    setIsPersonal(!isPersonal)
  }

  return (
    <div className={styles.container}>
      {aboutHeading}
      <button type="button" onClick={toggleContent} className={styles.toggleButton}>
        <p className={isPersonal ? styles.active : ''}>Personal</p>
        <div className={`${styles.toggleSwitch} ${isPersonal ? '' : styles.professional}`}>
          <div className={styles.toggleSlider} />
        </div>
        <p className={isPersonal ? '' : styles.active}>Professional</p>
      </button>
      <div className={styles.photoContainer}>
        <div className={`${styles.absolute} ${isPersonal ? styles.hidden : styles.visible}`}>
          {personalPhoto}
        </div>
        <div className={`${styles.absolute} ${isPersonal ? styles.visible : styles.hidden}`}>
          {professionalPhoto}
        </div>
      </div>
      <div className={styles.contentToggleText}>
        {isPersonal ? personalIntro : professionalIntro}
        {isPersonal ? null : <div>{professionalLogos}</div>}
      </div>
    </div>
  )
}
