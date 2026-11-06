import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/provencal" className="text-lg font-bold">
          Langues de France
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/provencal" className="underline-offset-4 hover:underline">
                Accueil provençal
              </Link>
            </li>
            <li>
              <Link href="/provencal/mot" className="underline-offset-4 hover:underline">
                Mots
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
