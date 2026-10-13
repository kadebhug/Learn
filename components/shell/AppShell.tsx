"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowClockwise, House, Path, User } from "@phosphor-icons/react";
import { RegisterSW } from "./RegisterSW";
import { ThemeSync } from "./ThemeSync";

const links = [
  { href: "/", label: "Home", icon: House },
  { href: "/paths", label: "Paths", icon: Path },
  { href: "/review", label: "Review", icon: ArrowClockwise },
  { href: "/you", label: "You", icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const learning = pathname.startsWith("/learn");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <>
      <ThemeSync />
      <RegisterSW />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      {!online && !learning && (
        <p className="bg-ink px-4 py-2 text-center text-sm text-paper" role="status">
          You are offline. Saved lessons still open. A new AI path needs a connection.
        </p>
      )}
      {learning ? (
        <div id="content">{children}</div>
      ) : (
        <div className="mx-auto grid min-h-[100dvh] w-full max-w-6xl md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="sticky top-0 hidden h-[100dvh] flex-col gap-1 border-r border-line px-3 py-6 md:flex">
            <Link href="/" className="px-3 pb-6 text-lg font-semibold tracking-tight">
              Grove
            </Link>
            <nav aria-label="Primary" className="grid gap-1">
              {links.map((link) => (
                <RailLink key={link.href} {...link} pathname={pathname} />
              ))}
            </nav>
          </aside>
          <div className="pb-24 md:pb-12">
            <div id="content">{children}</div>
          </div>
          <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <ul className="mx-auto grid max-w-lg grid-cols-4">
              {links.map((link) => (
                <li key={link.href}>
                  <RailLink {...link} pathname={pathname} compact />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

function RailLink({
  href,
  label,
  icon: Icon,
  pathname,
  compact = false,
}: {
  href: string;
  label: string;
  icon: typeof House;
  pathname: string;
  compact?: boolean;
}) {
  const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-full text-sm font-semibold ${
        compact ? "min-h-14 flex-col justify-center gap-0.5 text-[11px]" : "min-h-11 px-3"
      } ${active ? "bg-soft text-grove-deep" : "text-muted"}`}
    >
      <Icon size={compact ? 22 : 20} weight={active ? "fill" : "regular"} aria-hidden />
      {label}
    </Link>
  );
}
