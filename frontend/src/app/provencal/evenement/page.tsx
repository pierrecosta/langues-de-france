import type { Metadata } from "next";
import { connection } from "next/server";
import { DemoEventList } from "@/components/DemoEventList";
import { DemoEventNotice } from "@/components/DemoEventNotice";
import { demoEvents } from "@/lib/demo-events";

export const metadata: Metadata = {
  title: "Agenda provençal — démonstration",
  description: "Découvrez un aperçu fictif de l’agenda provençal.",
  robots: { index: false, follow: false },
  openGraph: { title: "Agenda provençal — démonstration", locale: "fr_FR", type: "website" },
};

export default async function EventsPage() {
  await connection();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Agenda provençal</h1>
      <DemoEventNotice />
      <DemoEventList events={demoEvents(new Date())} />
    </div>
  );
}
