type Formula = Record<string, number>;

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}
function lcm(a: number, b: number) { return Math.abs(a * b) / gcd(a, b); }

export function parseFormula(input: string): Formula {
  const clean = input.replace(/\s+/g, "");
  if (!clean || /[^A-Z0-9()[\]]/.test(clean)) throw new Error(`Invalid formula: ${input}`);
  const tokens = [...clean.matchAll(/([A-Z][a-z]?|\(|\)|\[|\]|\d+)/g)].map(m => m[0]);
  if (tokens.join("") !== clean) throw new Error(`Could not parse: ${input}`);

  const stack: Formula[] = [{}];
  const opens = new Set(["(", "["]);
  const closes = new Map([[")","("], ["]","["]]);
  const openStack: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (opens.has(t)) { stack.push({}); openStack.push(t); continue; }
    if (closes.has(t)) {
      if (!openStack.length || openStack.pop() !== closes.get(t)) throw new Error(`Unmatched bracket in ${input}`);
      const group = stack.pop()!;
      const n = Number(tokens[i + 1] && /^\d+$/.test(tokens[i + 1]) ? tokens[++i] : 1);
      for (const [el, count] of Object.entries(group)) stack.at(-1)![el] = (stack.at(-1)![el] ?? 0) + count * n;
      continue;
    }
    if (/^[A-Z][a-z]?$/.test(t)) {
      const n = Number(tokens[i + 1] && /^\d+$/.test(tokens[i + 1]) ? tokens[++i] : 1);
      stack.at(-1)![t] = (stack.at(-1)![t] ?? 0) + n;
    } else if (/^\d+$/.test(t)) throw new Error(`Unexpected number in ${input}`);
  }
  if (openStack.length) throw new Error(`Unclosed bracket in ${input}`);
  return stack[0];
}

/* Rational Gaussian elimination for the nullspace of an element matrix. */
function rref(matrix: Fraction[][]): Fraction[][] {
  const a = matrix.map(r => r.map(x => ({...x})));
  let row = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && row < a.length; col++) {
    let pivot = row;
    while (pivot < a.length && a[pivot][col].n === 0) pivot++;
    if (pivot === a.length) continue;
    [a[row], a[pivot]] = [a[pivot], a[row]];
    const p = a[row][col];
    a[row] = a[row].map(x => div(x, p));
    for (let r = 0; r < a.length; r++) if (r !== row && a[r][col].n !== 0) {
      const f = a[r][col];
      a[r] = a[r].map((x, c) => sub(x, mul(f, a[row][c])));
    }
    row++;
  }
  return a;
}
type Fraction = {n:number,d:number};
const F=(n:number,d=1):Fraction=>{if(d<0){n=-n;d=-d} const g=gcd(n,d); return {n:n/g,d:d/g}};
const add=(a:Fraction,b:Fraction)=>F(a.n*b.d+b.n*a.d,a.d*b.d);
const sub=(a:Fraction,b:Fraction)=>F(a.n*b.d-b.n*a.d,a.d*b.d);
const mul=(a:Fraction,b:Fraction)=>F(a.n*b.n,a.d*b.d);
const div=(a:Fraction,b:Fraction)=>F(a.n*b.d,a.d*b.n);

function nullVector(matrix: number[][]): Fraction[] {
  const rr = rref(matrix.map(row => row.map(F)));
  const cols = matrix[0].length;
  const pivotCols:number[]=[];
  for (const row of rr) {
    const p=row.findIndex(x=>x.n!==0);
    if(p>=0) pivotCols.push(p);
  }
  const free = [...Array(cols).keys()].filter(c=>!pivotCols.includes(c));
  if (!free.length) throw new Error("No non-zero balancing solution exists.");
  const v=Array.from({length:cols},()=>F(0));
  v[free[0]]=F(1);
  for(let r=pivotCols.length-1;r>=0;r--){
    const pc=pivotCols[r];
    let sum=F(0);
    for(let c=pc+1;c<cols;c++) sum=add(sum,mul(rr[r][c],v[c]));
    v[pc]=F(-sum.n,sum.d);
  }
  return v;
}

export function balanceReaction(rawReactants:string[], rawProducts:string[]) {
  if (!rawReactants.length || !rawProducts.length) throw new Error("Provide reactants and products.");
  const all=[...rawReactants,...rawProducts];
  const parsed=all.map(parseFormula);
  const elements=[...new Set(parsed.flatMap(x=>Object.keys(x)))];
  const matrix=elements.map(el=>all.map((_,i)=>{
    const sign=i<rawReactants.length?1:-1;
    return sign*(parsed[i][el]??0);
  }));
  const v=nullVector(matrix);
  const den=v.reduce((x,f)=>lcm(x,f.d),1);
  let ints=v.map(f=>f.n*(den/f.d));
  const common=ints.reduce((a,b)=>gcd(a,b),0);
  ints=ints.map(x=>x/common);
  if(ints.some(x=>x<0)){ if(ints.every(x=>x<=0)) ints=ints.map(x=>-x); else throw new Error("Could not find a positive stoichiometric solution."); }
  const equation=[...ints.slice(0,rawReactants.length),...ints.slice(rawReactants.length)].map((n,i)=>`${n===1?"":n}${all[i]}`);
  return { coefficients:ints, equation:`${equation.slice(0,rawReactants.length).join(" + ")} → ${equation.slice(rawReactants.length).join(" + ")}` };
}
