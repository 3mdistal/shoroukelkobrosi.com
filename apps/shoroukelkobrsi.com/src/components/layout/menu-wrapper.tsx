"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import Dialog from "../ui/dialog";
import styles from "./menu-wrapper.module.css";

export default function MenuWrapper(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const router = useRouter();

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setClickedLink(href);
    setTimeout(() => {
      setIsMenuOpen(false);
      router.push(href);
    }, 0);
  };

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
            <li>
              <Link
                href="/"
                onClick={handleLinkClick("/")}
                className={clickedLink === "/" ? styles.clickedLink : ""}
              >
                Films
              </Link>
            </li>
            <li>
              <Link
                href="/stills"
                onClick={handleLinkClick("/stills")}
                className={clickedLink === "/stills" ? styles.clickedLink : ""}
              >
                Stills
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={handleLinkClick("/about")}
                className={clickedLink === "/about" ? styles.clickedLink : ""}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </Dialog>
    </header>
  );
}
