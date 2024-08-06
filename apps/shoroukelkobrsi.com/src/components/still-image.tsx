"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./still-image.module.css";

interface StillImageProps {
  imageUrl: string;
  location: string;
  width: number;
  height: number;
}

export default function StillImage({
  imageUrl,
  location,
  width,
  height,
}: StillImageProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.stillImage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageUrl}
        alt={location}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ width: "100%", height: "auto" }}
      />
      {isHovered && (
        <div className={styles.locationOverlay}>
          <p>{location}</p>
        </div>
      )}
    </div>
  );
}
