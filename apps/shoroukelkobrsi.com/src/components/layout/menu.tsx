"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./menu.module.css";

const Dialog = dynamic(() => import("../ui/dialog"), { ssr: false });

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function Menu({
  isOpen,
  toggleMenu,
}: MenuProps): React.ReactElement {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <button type="button" onClick={toggleMenu} className={styles.menuButton}>
        {isOpen ? "Close" : "Menu"}
      </button>
      {isMounted && isOpen ? (
        <Dialog
          isOpen={isOpen}
          onClose={toggleMenu}
          className={styles.fullPageMenu}
        >
          <nav>
            <ul>
              <li>
                <Link href="/" onClick={toggleMenu}>
                  Films
                </Link>
              </li>
              <li>
                <Link href="/stills" onClick={toggleMenu}>
                  Stills
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={toggleMenu}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </Dialog>
      ) : null}
    </>
  );
}
