"use client";

import { useState } from "react";
import styles from "./about-content-toggle.module.css";

interface AboutContentToggleProps {
  personalIntro: React.ReactNode;
  professionalIntro: React.ReactNode;
  personalPhoto: React.ReactNode;
  professionalPhoto: React.ReactNode;
  professionalLogos: React.ReactNode;
}

export default function AboutContentToggle({
  personalIntro,
  professionalIntro,
  personalPhoto,
  professionalPhoto,
  professionalLogos,
}: AboutContentToggleProps): React.ReactElement {
  const [isPersonal, setIsPersonal] = useState(true);

  const toggleContent = (): void => {
    setIsPersonal(!isPersonal);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={toggleContent}
        className={styles.toggleButton}
      >
        {isPersonal ? "Show Professional" : "Show Personal"}
      </button>
      <div className={styles.contentToggle}>
        <div className={styles.photoContainer}>
          {isPersonal ? personalPhoto : professionalPhoto}
        </div>
        <div className={styles.contentToggleText}>
          {isPersonal ? personalIntro : professionalIntro}
          {isPersonal ? null : (
            <div className={styles.logos}>{professionalLogos}</div>
          )}
        </div>
      </div>
    </div>
  );
}
