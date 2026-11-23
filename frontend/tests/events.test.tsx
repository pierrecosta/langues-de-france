import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { DemoEventList } from "@/components/DemoEventList";
import { DemoEventNotice } from "@/components/DemoEventNotice";
import { demoEvents, formatEventDate } from "@/lib/demo-events";

describe("agenda de démonstration", () => {
  it("crée trois événements distincts avec des dates fictives à venir", () => {
    const events = demoEvents(new Date("2026-12-29T23:59:59Z"));
    expect(events.map((event) => event.date)).toEqual(["2027-01-05", "2027-01-12", "2027-01-19"]);
    expect(new Set(events.map((event) => event.slug)).size).toBe(3);
    expect(formatEventDate(events[0]!.date)).toBe("mardi 5 janvier 2027");
    expect(demoEvents(new Date("2026-12-30T00:00:00Z"))[0]?.date).toBe("2027-01-06");
  });

  it("affiche les fiches fictives et leur avertissement sans violation axe", async () => {
    const events = demoEvents(new Date("2026-01-01T00:00:00Z"));
    const { container } = render(<><DemoEventNotice /><DemoEventList events={events} /></>);
    expect(screen.getByText(/événements et leurs lieux sont fictifs/)).toBeInTheDocument();
    expect(screen.getByText(/dates changent chaque jour/)).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]!).getByRole("link", { name: events[0]!.title })).toHaveAttribute(
      "href", "/provencal/evenement/atelier-decouverte",
    );
    expect(container.querySelector("time")).toHaveAttribute("datetime", "2026-01-08");
    expect((await axe(container)).violations).toHaveLength(0);
  });

  it("signale explicitement une liste vide", () => {
    render(<DemoEventList events={[]} />);
    expect(screen.getByText("Aucun événement de démonstration n’est annoncé.")).toBeInTheDocument();
  });
});
