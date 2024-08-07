"use client";

import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import Dialog from "../ui/dialog";
import styles from "./menu.module.css";

const TOGGLE_MENU_EVENT = "toggle-menu";

interface MenuProps {
  isOpen: boolean;
}

export default function Menu({ isOpen }: MenuProps): React.ReactElement {
  const [isMounted, setIsMounted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerToggle = (): void => {
    window.dispatchEvent(new Event(TOGGLE_MENU_EVENT));
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFadingOut(true);
    setTimeout(() => {
      triggerToggle();
      router.push(href);
    }, 0); // Adjust this timeout to match your fade-out animation duration
  };

  return (
    <header className={styles.header}>
      {isMounted && isOpen ? (
        <Dialog
          isOpen={isOpen}
          onClose={triggerToggle}
          className={`${styles.fullPageMenu} ${isFadingOut ? styles.fadeOut : ""}`}
        >
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
                <Link href="/" onClick={handleLinkClick("/")}>
                  Films
                </Link>
              </li>
              <li>
                <Link href="/stills" onClick={handleLinkClick("/stills")}>
                  Stills
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={handleLinkClick("/about")}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </Dialog>
      ) : null}
    </header>
  );
}
