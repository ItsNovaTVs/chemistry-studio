import { describe, expect, it } from "vitest";
import { balanceReaction, parseFormula, splitSpecies } from "./reactionEngine";
import elements from "../data/periodic-table.json";

describe("formula parser", () => {
  it("counts nested parenthesized and square-bracket groups", () => {
    expect(parseFormula("K4[Fe(CN)6]")).toEqual({ K: 4, Fe: 1, C: 6, N: 6 });
  });

  it("counts hydrate groups and ignores phase labels", () => {
    expect(parseFormula("CuSO4·5H2O(aq)")).toEqual({ Cu: 1, S: 1, O: 9, H: 10 });
  });

  it("supports conventional single charges and caret multi-charges", () => {
    expect(parseFormula("NH4+")).toEqual({ N: 1, H: 4 });
    expect(parseFormula("SO4^2-")).toEqual({ S: 1, O: 4 });
  });

  it("rejects unknown elements and malformed groups", () => {
    expect(() => parseFormula("Xx2")).toThrow(/Unknown element/);
    expect(() => parseFormula("Ca(OH]2")).toThrow(/Mismatched/);
  });

  it("rejects coefficients mixed into a species formula", () => {
    expect(() => parseFormula("2H2O")).toThrow(/coefficients separately/);
  });

  it("contains exactly the 118 recognized elements", () => {
    expect(elements).toHaveLength(118);
    expect(elements[elements.length - 1]?.number).toBe(118);
  });
});

describe("reaction balancing", () => {
  it("balances a standard redox reaction", () => {
    expect(balanceReaction(["KMnO4", "HCl"], ["KCl", "MnCl2", "H2O", "Cl2"]).equation)
      .toBe("2KMnO4 + 16HCl → 2KCl + 2MnCl2 + 8H2O + 5Cl2");
  });

  it("balances equations with multiple independent solutions", () => {
    expect(balanceReaction(["C", "O2"], ["CO", "CO2"]).coefficients).toEqual([3, 2, 2, 1]);
  });

  it("balances ionic charge as well as atoms", () => {
    expect(balanceReaction(["Fe^3+", "e-"], ["Fe"]).equation).toBe("Fe^3+ + 3e- → Fe");
  });

  it("splits species without splitting a charged ion", () => {
    expect(splitSpecies("Fe^3+ + OH-")).toEqual(["Fe^3+", "OH-"]);
  });

  it("rejects equations without a positive solution", () => {
    expect(() => balanceReaction(["H2"], ["O2"])).toThrow(/balancing solution/);
  });
});
