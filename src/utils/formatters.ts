export function formulaHTML(formula: string): string {
  return formula.replace(/(\d+)/g, "<sub>$1</sub>");
}
export function coefficient(n: number, formula: string) {
  return `${n === 1 ? "" : n}${formula}`;
}
