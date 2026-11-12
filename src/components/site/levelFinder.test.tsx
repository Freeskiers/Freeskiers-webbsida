import { describe, it, expect } from "vitest";
import { recommend } from "./LevelFinder";

describe("LevelFinder recommendation logic (Nivåväljaren)", () => {
  describe("Under 5 years (toddler)", () => {
    it("returns 'Inte gammal nog än' and refers to private lessons from age 4", () => {
      const res = recommend(["toddler"]);
      expect(res.badge).toContain("Inte gammal nog än");
      expect(res.to).toBe("/privatlektion");
      expect(res.title).toContain("4 år");
    });
  });

  describe("Children 5–10 years (young & child)", () => {
    it("recommends Helgskidskola Grön for 5-6 year old beginner", () => {
      const res = recommend(["young", "beginner", "weekend"]);
      expect(res.title).toContain("Helgskidskola – Grön Grupp");
      expect(res.to).toBe("/helgskidskola");
      expect(res.details[0]).toContain("5–10 år");
      expect(res.details).toContain("Kunna ta instruktioner på svenska");
    });

    it("recommends Helgskidskola Blå for 7-10 year old intermediate", () => {
      const res = recommend(["child", "intermediate", "weekend"]);
      expect(res.title).toContain("Helgskidskola – Blå Grupp");
      expect(res.to).toBe("/helgskidskola");
      expect(res.details[0]).toContain("5–10 år");
    });

    it("recommends Helgskidskola Röd for 7-10 year old Fortsättning (never Skidklubben)", () => {
      const res = recommend(["child", "advanced", "weekend"]);
      expect(res.title).toContain("Helgskidskola – Röd Grupp");
      expect(res.to).toBe("/helgskidskola");
      expect(res.details[0]).toContain("5–10 år");

      const resEvenIfClubPassed = recommend(["child", "advanced", "club"]);
      expect(resEvenIfClubPassed.title).toContain("Helgskidskola – Röd Grupp");
      expect(resEvenIfClubPassed.to).toBe("/helgskidskola");
    });

    it("recommends Privatlektion if 5-10 year old chooses private coach", () => {
      const res = recommend(["child", "intermediate", "private"]);
      expect(res.title).toBe("Privatlektion");
      expect(res.to).toBe("/privatlektion");
    });
  });

  describe("Over 10 years (teen: 11–15 years) - Upper age limit 10 years for Helgskidskola", () => {
    it("refers to Privatlektion when an 11-15 year old chooses weekend skiing", () => {
      const res = recommend(["teen", "intermediate", "weekend"]);
      expect(res.title).toBe("Privatlektion");
      expect(res.to).toBe("/privatlektion");
      expect(res.desc).toContain("övre åldersgräns på 10 år");
      expect(res.details[0]).toContain("Helgskidskolans maxålder är 10 år");
    });

    it("refers to Privatlektion when an 11-15 year old is a beginner", () => {
      const res = recommend(["teen", "beginner", "weekend"]);
      expect(res.title).toBe("Privatlektion");
      expect(res.to).toBe("/privatlektion");
      expect(res.desc).toContain("övre åldersgräns på 10 år");
    });

    it("refers to Privatlektion when an 11-15 year old beginner selects club (does not meet club min requirements)", () => {
      const res = recommend(["teen", "beginner", "club"]);
      expect(res.title).toBe("Privatlektion");
      expect(res.to).toBe("/privatlektion");
    });

    it("refers to Privatlektion for 11-15 year old with Fortsättning level (Helgskidskola max age 10, Skidklubben requires Medelgod+)", () => {
      const res = recommend(["teen", "advanced", "club"]);
      expect(res.title).toBe("Privatlektion");
      expect(res.to).toBe("/privatlektion");
    });

    it("refers to Skidklubben for 11-15 year old freestyle / park skier", () => {
      const res = recommend(["teen", "freestyle", "club"]);
      expect(res.title).toBe("Freeskiers Skidklubb");
      expect(res.to).toBe("/skidklubb");
    });

    it("refers to Skidklubben for 7-10 year old with Medelgod åkare level", () => {
      const res = recommend(["child", "skidklubb_mid", "club"]);
      expect(res.title).toBe("Freeskiers Skidklubb");
      expect(res.badge).toContain("Medelgod åkare");
      expect(res.to).toBe("/skidklubb");
    });
  });

  describe("Adults (16+)", () => {
    it("refers adults to Privatlektion immediately", () => {
      const res = recommend(["adult"]);
      expect(res.title).toBe("Privatlektion");
      expect(res.badge).toContain("Vuxen");
      expect(res.to).toBe("/privatlektion");
    });
  });
});
