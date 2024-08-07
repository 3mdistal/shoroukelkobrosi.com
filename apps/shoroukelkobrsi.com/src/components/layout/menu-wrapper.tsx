"use client";

import React, { useState, useEffect } from "react";
import Menu from "./menu";
import styles from "./menu-wrapper.module.css";

const TOGGLE_MENU_EVENT = "toggle-menu";

export default function MenuWrapper(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleToggle = (): void => {
      setIsMenuOpen((prev) => !prev);
    };
    window.addEventListener(TOGGLE_MENU_EVENT, handleToggle);
    return () => {
      window.removeEventListener(TOGGLE_MENU_EVENT, handleToggle);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const triggerToggle = (): void => {
    window.dispatchEvent(new Event(TOGGLE_MENU_EVENT));
  };

  return (
    <>
      <button
        type="button"
        onClick={triggerToggle}
        className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`}
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
      >
        Menu
      </button>
      <Menu isOpen={isMenuOpen} />
    </>
  );
}
