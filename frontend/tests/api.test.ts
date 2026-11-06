import { describe, expect, it } from "vitest";
import { getWord, listWords, normalize } from "@/lib/api";

describe("api (repli local)", () => {
  it("normalise accents et casse", () => {
    expect(normalize("  Été ")).toBe("ete");
  });
  it("trouve un mot sans accent", async () => {
    const words = await listWords("fenetre");
    expect(words.map((w) => w.slug)).toContain("fenestra");
  });
  it("renvoie tout sans requête et vide si rien ne correspond", async () => {
    expect((await listWords("")).length).toBeGreaterThan(5);
    expect(await listWords("zzzz")).toEqual([]);
  });
  it("renvoie null pour un slug inconnu", async () => {
    expect(await getWord("inconnu")).toBeNull();
    expect((await getWord("bonjorn"))?.french).toBe("Bonjour");
  });
});
