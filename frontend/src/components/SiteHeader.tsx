import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Link href="/carte" className="site-brand">
          Langues de France
        </Link>
        <nav aria-label="Navigation principale" className="site-nav">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
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
              <Link href="/provencal/quiz" className="underline-offset-4 hover:underline">
                Quiz
              </Link>
            </li>
            <li>
              <Link href="/carte" className="underline-offset-4 hover:underline">
                Carte
              </Link>
            </li>
            <li>
              <Link href="/provencal/evenement" className="underline-offset-4 hover:underline">
                Agenda
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
