"use client";

import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from "../ui/dialog";
import styles from "./menu.module.css";

const TOGGLE_MENU_EVENT = "toggle-menu";

interface MenuProps {
  isOpen: boolean;
}

export default function Menu({ isOpen }: MenuProps): React.ReactElement {
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const router = useRouter();

  const triggerToggle = (): void => {
    window.dispatchEvent(new Event(TOGGLE_MENU_EVENT));
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setClickedLink(href);
    setTimeout(() => {
      triggerToggle();
      router.push(href);
    }, 0);
  };

  return (
    <header className={styles.header}>
      <Dialog isOpen={isOpen} className={styles.fullPageMenu}>
        <nav id="main-menu">
          <button
            type="button"
            onClick={triggerToggle}
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
