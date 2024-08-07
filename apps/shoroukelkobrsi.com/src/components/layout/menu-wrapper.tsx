"use client";

import React, { useState, useEffect } from "react";
import Menu from "./menu";

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

  return <Menu isOpen={isMenuOpen} />;
}
