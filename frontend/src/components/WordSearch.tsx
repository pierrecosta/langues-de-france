export function WordSearch({ q }: { q: string }) {
  return (
    <form action="/provencal/mot" method="get" role="search" className="flex flex-wrap gap-2">
      <label htmlFor="q" className="w-full font-medium">
        Rechercher un mot
      </label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={q}
        className="min-w-0 flex-1 rounded-md border border-border bg-bg px-3 py-2"
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 font-medium text-on-primary"
      >
        Rechercher
      </button>
    </form>
  );
}
