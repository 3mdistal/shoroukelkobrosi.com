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
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Image
        src={imageUrl}
        alt={location}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${btoa(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toString()} ${height.toString()}">
              <rect width="100%" height="100%" fill="#F0F0F0"/>
            </svg>`,
        )}`}
      />
      {isHovered && (
        <div className={styles.locationOverlay}>
          <p>{location}</p>
        </div>
      )}
    </div>
  );
}
