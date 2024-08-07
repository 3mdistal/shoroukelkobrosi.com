"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import Dialog from "../ui/dialog";
import styles from "./menu-wrapper.module.css";

export default function MenuWrapper(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsMenuOpen(false);
      router.push(href);
    }, 0);
  };

  const menuItems = [
    { href: "/", label: "Films" },
    { href: "/stills", label: "Stills" },
    { href: "/about", label: "About" },
  ];

  return (
    <header>
      <button
        type="button"
        onClick={() => {
          setIsMenuOpen(true);
        }}
        className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`}
        aria-expanded={isMenuOpen}
        aria-controls="main-menu"
      >
        Menu
      </button>
      <Dialog
        isOpen={isMenuOpen}
        className={styles.fullPageMenu}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      >
        <nav id="main-menu">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className={styles.closeButton}
            aria-label="Close menu"
          >
            &#x2715;
          </button>
          <ul>
            {menuItems.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={handleLinkClick(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Dialog>
    </header>
  );
}
