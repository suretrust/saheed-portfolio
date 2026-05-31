"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { NAV } from "@/lib/content";

export function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const top = "/" + (pathname.split("/")[1] || "");
  const isHome = pathname === "/";
  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape; restore focus to the burger button.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // When the drawer opens, move focus into it for keyboard / screen reader users.
  useEffect(() => {
    if (open) {
      const first = drawerRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
    }
  }, [open]);

  // Close drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="nav" role="banner">
      <div className="wrap nav-inner">
        <Link
          href="/"
          className="nav-brand"
          aria-label="Saheed Oladele — go to home"
          aria-current={isHome ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          <Logo size={30} />
          <span className="nav-brand-name">Saheed&nbsp;Oladele</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => {
            const isActive = top === n.path;
            return (
              <Link
                key={n.path}
                href={n.path}
                aria-current={isActive ? "page" : undefined}
                className={"nav-link" + (isActive ? " is-active" : "")}
              >
                {n.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
        <div className="nav-mobile">
          <ThemeToggle />
          <button
            ref={burgerRef}
            className="nav-burger"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen(!open)}
          >
            <span className={open ? "is-x" : ""} aria-hidden="true"></span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="nav-drawer"
          ref={drawerRef}
          className="nav-drawer"
          aria-label="Mobile primary"
        >
          {NAV.map((n) => {
            const isActive = top === n.path;
            return (
              <Link
                key={n.path}
                href={n.path}
                aria-current={isActive ? "page" : undefined}
                className="nav-drawer-link"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
