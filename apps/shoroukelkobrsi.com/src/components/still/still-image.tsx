"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./still-image.module.css";

interface StillImageProps {
  imageUrl: string;
  width: number;
  height: number;
}

export default function StillImage({
  imageUrl,
  width,
  height,
}: StillImageProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const currentRef = imageRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={imageRef}
      className={`${styles.stillImage} ${isVisible ? styles.visible : ""}`}
    >
      <Image
        src={imageUrl}
        alt="Still image"
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${btoa(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toString()} ${height.toString()}">
              <rect width="100%" height="100%" fill="#F0F0F0"/>
            </svg>`,
        )}`}
      />
    </div>
  );
}
