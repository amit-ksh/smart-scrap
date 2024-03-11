import { title } from "@/components/primitives";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  return (
    <header className="flex items-center justify-between gap-4 py-4 px-6">
      <h1 className={title({ size: "sm" })}>Smart Scrap</h1>
      <ThemeSwitch />
    </header>
  );
}
