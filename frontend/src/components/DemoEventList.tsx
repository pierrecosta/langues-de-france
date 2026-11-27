import Link from "next/link";
import { formatEventDate, type DemoEvent } from "@/lib/demo-events";

export function DemoEventList({ events }: { events: DemoEvent[] }) {
  if (events.length === 0) {
    return <p>Aucun événement de démonstration n’est annoncé.</p>;
  }

  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li key={event.slug} className="border-t border-border py-4">
          <article className="space-y-2">
            <h2 className="text-xl font-bold">
              <Link className="text-primary underline" href={`/provencal/evenement/${event.slug}`}>
                {event.title}
              </Link>
            </h2>
            <p><time dateTime={event.date}>{formatEventDate(event.date)}</time></p>
            <p>{event.place}</p>
            <p>{event.description}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
