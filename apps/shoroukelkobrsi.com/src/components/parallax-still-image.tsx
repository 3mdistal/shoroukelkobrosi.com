"use client";

import { useRef, useEffect, useState } from "react";
import StillImage from "./still-image";
import styles from "./parallax-still-image.module.css";

interface ParallaxStillImageProps {
  imageUrl: string;
  location: string;
  width: number;
  height: number;
}

export default function ParallaxStillImage({
  imageUrl,
  location,
  width,
  height,
}: ParallaxStillImageProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isOffsetCalculated, setIsOffsetCalculated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const parallaxFactor = useRef(Math.random() * 0.3 + 1.5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (ref.current) {
        const { top, height: elementHeight } =
          ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = top + elementHeight / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = elementCenter - windowCenter;

        const maxOffset = elementHeight * 0.05; // 5% of the element height
        const newOffset =
          (distanceFromCenter / windowHeight) *
          maxOffset *
          parallaxFactor.current;
        setOffset(newOffset);
        if (!isOffsetCalculated) {
          setIsOffsetCalculated(true);
        }
      }
    };

    handleScroll(); // Calculate initial offset
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible, isOffsetCalculated]);

  return (
    <div
      ref={ref}
      className={styles.parallaxContainer}
      style={{ aspectRatio: `${width.toString()} / ${height.toString()}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.parallaxInner}
        style={{
          transform: `translateY(${offset.toString()}px)`,
        }}
      >
        {isOffsetCalculated && (
          <StillImage imageUrl={imageUrl} width={width} height={height} />
        )}
      </div>
      {isHovered && (
        <div className={styles.locationOverlay}>
          <p>{location}</p>
        </div>
      )}
    </div>
  );
}
