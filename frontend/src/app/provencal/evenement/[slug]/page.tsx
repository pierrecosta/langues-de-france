import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { DemoEventNotice } from "@/components/DemoEventNotice";
import { demoEvents, formatEventDate } from "@/lib/demo-events";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = {
  title: "Événement fictif — démonstration",
  description: "Fiche d’un événement fictif de l’agenda de démonstration.",
  robots: { index: false, follow: false },
  openGraph: { title: "Événement fictif — démonstration", locale: "fr_FR", type: "article" },
};

export default async function EventPage({ params }: Props) {
  await connection();
  const { slug } = await params;
  const event = demoEvents(new Date()).find((item) => item.slug === slug);
  if (!event) notFound();

  return (
    <div className="space-y-6">
      <Link href="/provencal/evenement" className="underline">← Retour à l’agenda</Link>
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <DemoEventNotice />
      <dl className="space-y-4">
        <div>
          <dt className="font-bold">Date fictive</dt>
          <dd><time dateTime={event.date}>{formatEventDate(event.date)}</time></dd>
        </div>
        <div>
          <dt className="font-bold">Lieu fictif</dt>
          <dd>{event.place}</dd>
        </div>
      </dl>
      <p>{event.description}</p>
    </div>
  );
}
