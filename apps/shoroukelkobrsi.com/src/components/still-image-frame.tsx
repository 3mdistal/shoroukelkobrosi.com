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
  const parallaxDirection = 1;
  const parallaxIntensity = useRef(Math.random() * 0.3 + 0.7).current; // Random intensity between 0.7 and 1
  const parallaxFactor = 0.075; // edit the strength of the parallax effect

  useEffect(() => {
    const handleScroll = (): void => {
      if (ref.current) {
        const { top, height: elementHeight } =
          ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const percentageInView =
          (windowHeight - top) / (windowHeight + elementHeight);
        const newOffset =
          (percentageInView - 0.5) *
          elementHeight *
          parallaxIntensity *
          parallaxDirection *
          parallaxFactor;
        setOffset(newOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [parallaxDirection, parallaxIntensity]);

  return (
    <div
      ref={ref}
      className={styles.parallaxContainer}
      style={{ aspectRatio: `${width.toString()} / ${height.toString()}` }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div
        className={styles.parallaxInner}
        style={{
          transform: `translateY(${offset.toString()}px)`,
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
