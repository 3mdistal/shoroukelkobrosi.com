"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./menu.module.css";

const Dialog = dynamic(() => import("../ui/dialog"), { ssr: false });

const TOGGLE_MENU_EVENT = "toggle-menu";

interface MenuProps {
  isOpen: boolean;
}

export default function Menu({ isOpen }: MenuProps): React.ReactElement {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerToggle = () => {
    window.dispatchEvent(new Event(TOGGLE_MENU_EVENT));
  };

  return (
    <header className={styles.header}>
      <button
        type="button"
        onClick={triggerToggle}
        className={styles.menuButton}
        aria-expanded={isOpen}
        aria-controls="main-menu"
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      {isMounted && isOpen ? (
        <Dialog
          isOpen={isOpen}
          onClose={triggerToggle}
          className={styles.fullPageMenu}
        >
          <nav id="main-menu">
            <ul>
              <li>
                <Link href="/" onClick={triggerToggle}>
                  Films
                </Link>
              </li>
              <li>
                <Link href="/stills" onClick={triggerToggle}>
                  Stills
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={triggerToggle}>
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
