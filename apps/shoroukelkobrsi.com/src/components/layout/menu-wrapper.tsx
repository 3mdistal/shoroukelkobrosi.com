"use client";

import React, { useState } from "react";
import Menu from "./menu";

const MenuWrapper: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />;
};

export default MenuWrapper;
