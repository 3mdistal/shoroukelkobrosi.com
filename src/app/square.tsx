"use client";
import styles from "./page.module.css";
import { useState } from "react";

export const Square = () => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`${styles.square} ${isActive ? styles.active : ""}`}
      onMouseDown={handleMouseDown}
    ></div>
  );
};
