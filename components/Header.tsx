"use client";

import { ThemeSwitch } from "./theme-switch";

import { title } from "./primitives";
import { useTheme } from "next-themes";

function Header() {
  const { theme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-4 py-4 px-6 border-b-2 border-zinc-400">
      <h1 className={title({ size: "sm" })}>Smart Scrap</h1>
      <div className="flex gap-4">
        <ThemeSwitch />
      </div>
    </header>
  );
}

export default Header;
