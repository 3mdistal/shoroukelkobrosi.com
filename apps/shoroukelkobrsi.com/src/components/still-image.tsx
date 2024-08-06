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
    const observedElement = imageRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
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
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
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
