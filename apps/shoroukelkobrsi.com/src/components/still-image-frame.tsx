"use client";

import { useRef, useEffect, useState } from "react";
import StillImage from "./still-image";
import styles from "./still-image-frame.module.css";

interface StillImageFrameProps {
  imageUrl: string;
  location: string;
  width: number;
  height: number;
}

export default function StillImageFrame({
  imageUrl,
  location,
  width,
  height,
}: StillImageFrameProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Random factors for direction and intensity
  const parallaxDirection = useRef(Math.random() > 0.5 ? 1 : -1).current; // Random direction (up or down)
  const parallaxIntensity = useRef(Math.random() * 0.15 + 0.05).current; // Random intensity between 0.05 and 0.2

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top, height } = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const percentageInView = (windowHeight - top) / (windowHeight + height);
        const newOffset =
          (percentageInView - 0.5) *
          height *
          parallaxIntensity *
          parallaxDirection;
        setOffset(newOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallaxDirection, parallaxIntensity]);

  return (
    <div
      ref={ref}
      className={styles.parallaxContainer}
      style={{ aspectRatio: `${width} / ${height}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.parallaxInner}
        style={{
          transform: `translateY(${offset}px)`,
        }}
      >
        <StillImage imageUrl={imageUrl} width={width} height={height} />
      </div>
      {isHovered && (
        <div className={styles.locationOverlay}>
          <p>{location}</p>
        </div>
      )}
    </div>
  );
}
