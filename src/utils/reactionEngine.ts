import elements from "../data/periodic-table.json";

export type Formula = Record<string, number>;
const symbols = new Set((elements as { symbol: string }[]).map((element) => element.symbol));

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}
function lcm(a: number, b: number) { return Math.abs(a * b) / gcd(a, b); }
function addScaled(target: Formula, source: Formula, scale: number) {
  for (const [symbol, count] of Object.entries(source)) target[symbol] = (target[symbol] ?? 0) + count * scale;
}

function parseSegment(text: string, original: string): Formula {
  const tokens = [...text.matchAll(/([A-Z][a-z]?|\(|\)|\[|\]|\d+)/g)].map((match) => match[0]);
  if (!text || tokens.join("") !== text) throw new Error("Could not parse formula “" + original + "”.");
  const stack: Formula[] = [{}];
  const bracketStack: string[] = [];
  const closing: Record<string, string> = { ")": "(", "]": "[" };
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    if (token === "(" || token === "[") { stack.push({}); bracketStack.push(token); continue; }
    if (token === ")" || token === "]") {
      if (bracketStack.pop() !== closing[token] || stack.length === 1) throw new Error("Mismatched brackets in “" + original + "”.");
      const group = stack.pop()!;
      const next = tokens[index + 1];
      const multiplier = next && /^\d+$/.test(next) ? Number(tokens[++index]) : 1;
      if (multiplier < 1) throw new Error("Subscripts must be positive in “" + original + "”.");
      addScaled(stack[stack.length - 1], group, multiplier);
      continue;
    }
    if (/^[A-Z][a-z]?$/.test(token)) {
      if (!symbols.has(token)) throw new Error("Unknown element symbol “" + token + "” in “" + original + "”.");
      const next = tokens[index + 1];
      const multiplier = next && /^\d+$/.test(next) ? Number(tokens[++index]) : 1;
      if (multiplier < 1) throw new Error("Subscripts must be positive in “" + original + "”.");
      const current = stack[stack.length - 1];
      current[token] = (current[token] ?? 0) + multiplier;
    } else throw new Error("Unexpected number in “" + original + "”.");
  }
  if (bracketStack.length) throw new Error("Unclosed bracket in “" + original + "”.");
  return stack[0];
}

/** Parses neutral formula composition; charge and phase labels do not affect atom counts. */
export function parseFormula(input: string): Formula {
  const normalized = input.replace(/\s+/g, "").replace(/\((?:s|l|g|aq)\)$/i, "").replace(/\^(?:\d*[+-]|[+-]\d*)$/, "").replace(/[+-]$/, "");
  if (!normalized) throw new Error("Enter a chemical formula.");
  if (normalized === "e") return {};
  const segments = normalized.split(/[·⋅]/);
  const result: Formula = {};
  for (const [index, raw] of segments.entries()) {
    const match = raw.match(/^(\d+)?(.*)$/);
    const multiplier = match?.[1] ? Number(match[1]) : 1;
    if (!multiplier || !match?.[2]) throw new Error("Could not parse formula “" + input + "”.");
    if (index === 0 && match[1]) throw new Error("Enter reaction coefficients separately; remove the leading number from “" + input + "”.");
    addScaled(result, parseSegment(match[2], input), multiplier);
  }
  return result;
}

function parseCharge(input: string): number {
  const match = input.replace(/\((?:s|l|g|aq)\)$/i, "").match(/\^(?:(\d+)([+-])|([+-])(\d+))$/);
  if (match) return Number(match[1] ?? match[4] ?? 1) * ((match[2] ?? match[3]) === "+" ? 1 : -1);
  const terminal = input.replace(/\((?:s|l|g|aq)\)$/i, "").match(/([+-])$/);
  return terminal ? (terminal[1] === "+" ? 1 : -1) : 0;
}

type Fraction = { n: number; d: number };
const F = (n: number, d = 1): Fraction => {
  if (d < 0) { n = -n; d = -d; }
  const divisor = gcd(n, d);
  return { n: n / divisor, d: d / divisor };
};
const add = (a: Fraction, b: Fraction) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a: Fraction, b: Fraction) => F(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a: Fraction, b: Fraction) => F(a.n * b.n, a.d * b.d);
const div = (a: Fraction, b: Fraction) => F(a.n * b.d, a.d * b.n);

function rref(matrix: Fraction[][]) {
  const rows = matrix.map((row) => row.map((value) => ({ ...value })));
  const pivots: number[] = [];
  let row = 0;
  for (let column = 0; column < (rows[0]?.length ?? 0) && row < rows.length; column++) {
    const pivot = rows.findIndex((values, index) => index >= row && values[column].n !== 0);
    if (pivot < 0) continue;
    [rows[row], rows[pivot]] = [rows[pivot], rows[row]];
    const divisor = rows[row][column];
    rows[row] = rows[row].map((value) => div(value, divisor));
    for (let other = 0; other < rows.length; other++) if (other !== row && rows[other][column].n !== 0) {
      const factor = rows[other][column];
      rows[other] = rows[other].map((value, index) => sub(value, mul(factor, rows[row][index])));
    }
    pivots.push(column); row++;
  }
  return { rows, pivots };
}

function integerVector(vector: Fraction[]): number[] {
  const denominator = vector.reduce((value, fraction) => lcm(value, fraction.d), 1);
  const result = vector.map((fraction) => fraction.n * (denominator / fraction.d));
  const divisor = result.reduce((value, number) => gcd(value, number), 0);
  return result.map((number) => number / divisor);
}

/** Finds a small positive integer null vector; enumerates underdetermined systems. */
function positiveNullVector(matrix: number[][]): number[] {
  const columns = matrix[0].length;
  const { rows, pivots } = rref(matrix.map((row) => row.map((value) => F(value))));
  const free = Array.from({ length: columns }, (_, index) => index).filter((column) => !pivots.includes(column));
  if (!free.length) throw new Error("These species have no non-zero balancing solution.");
  const build = (freeValues: number[]) => {
    const vector = Array.from({ length: columns }, () => F(0));
    free.forEach((column, index) => { vector[column] = F(freeValues[index]); });
    for (let index = pivots.length - 1; index >= 0; index--) {
      const column = pivots[index];
      let sum = F(0);
      for (let c = column + 1; c < columns; c++) sum = add(sum, mul(rows[index][c], vector[c]));
      vector[column] = F(-sum.n, sum.d);
    }
    return integerVector(vector);
  };
  if (free.length > 4) throw new Error("This equation has too many independent solutions to balance reliably; reduce the number of species.");
  let best: number[] | null = null;
  for (let bound = 1; bound <= 12; bound++) {
    const values = Array(free.length).fill(1);
    const visit = (position: number) => {
      if (position === values.length) {
        const candidate = build(values);
        if (candidate.every((value) => value > 0) && (!best || candidate.reduce((a, b) => a + b, 0) < best.reduce((a, b) => a + b, 0))) best = candidate;
        return;
      }
      for (let value = 1; value <= bound; value++) { values[position] = value; visit(position + 1); }
    };
    visit(0);
  }
  if (!best) throw new Error("Could not find positive coefficients for every species. Check that the equation is chemically consistent.");
  return best;
}

export function splitSpecies(side: string): string[] {
  return side.split(/\s+\+\s+/).map((species) => species.trim()).filter(Boolean);
}

export function balanceReaction(rawReactants: string[], rawProducts: string[]) {
  const reactants = rawReactants.map((value) => value.trim()).filter(Boolean);
  const products = rawProducts.map((value) => value.trim()).filter(Boolean);
  if (!reactants.length || !products.length) throw new Error("Provide at least one reactant and one product.");
  const all = [...reactants, ...products];
  if (new Set(all).size !== all.length) throw new Error("Each species must appear only once in the equation.");
  const formulas = all.map(parseFormula);
  const atomTypes = [...new Set(formulas.flatMap((formula) => Object.keys(formula)))];
  if (all.some((species) => parseCharge(species) !== 0)) atomTypes.push("__charge__");
  const matrix = atomTypes.map((atom) => all.map((_, index) => (index < reactants.length ? 1 : -1) * (formulas[index][atom] ?? 0)));
  if (atomTypes.includes("__charge__")) matrix[atomTypes.indexOf("__charge__")] = all.map((species, index) => (index < reactants.length ? 1 : -1) * parseCharge(species));
  const coefficients = positiveNullVector(matrix);
  const parts = all.map((species, index) => coefficients[index] === 1 ? species : coefficients[index] + species);
  return { coefficients, equation: parts.slice(0, reactants.length).join(" + ") + " → " + parts.slice(reactants.length).join(" + ") };
}
