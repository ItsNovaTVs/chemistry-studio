import { useState } from "react";
import { balanceReaction } from "../../utils/reactionEngine";

export function ReactionInput() {
  const [left,setLeft]=useState("KMnO4 + HCl");
  const [right,setRight]=useState("KCl + MnCl2 + H2O + Cl2");
  const [result,setResult]=useState<string|null>(null);
  const [error,setError]=useState<string|null>(null);
  const [conditions,setConditions]=useState("None");

  function solve(){
    try {
      const r=balanceReaction(left.split("+").map(x=>x.trim()).filter(Boolean),right.split("+").map(x=>x.trim()).filter(Boolean));
      setResult(r.equation);setError(null);
    } catch(e){setError(e instanceof Error?e.message:"Could not balance reaction.");setResult(null)}
  }
  return <section className="max-w-4xl"><h2 className="text-2xl font-bold">Reaction Engine</h2><p className="text-slate-400 text-sm mt-1">Enter formulas separated by <code>+</code>. Balancing uses exact rational arithmetic.</p>
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <label className="field"><span>Reactants</span><input value={left} onChange={e=>setLeft(e.target.value)} placeholder="Fe2O3 + CO"/></label>
      <label className="field"><span>Products</span><input value={right} onChange={e=>setRight(e.target.value)} placeholder="Fe + CO2"/></label>
    </div>
    <div className="mt-4 flex flex-wrap gap-3 items-end"><label className="field flex-1 min-w-48"><span>Condition / catalyst</span><select value={conditions} onChange={e=>setConditions(e.target.value)}><option>None</option><option>Heat (Δ)</option><option>Pt</option><option>H2SO4</option><option>Pressure</option></select></label><button className="primary" onClick={solve}>Balance equation</button></div>
    {result && <div className="result-card mt-6"><div className="text-xs text-cyan-300 uppercase tracking-wider">Balanced equation</div><div className="equation mt-2">{result}</div>{conditions!=="None"&&<div className="text-sm text-slate-400 mt-3">Condition: <span className="text-white">{conditions}</span></div>}</div>}
    {error && <div className="error mt-4">{error}</div>}
    <div className="mt-6 text-xs text-slate-500">This balances stoichiometry. It does not magically prove that a reaction occurs under the selected conditions, because chemistry remains annoyingly attached to reality.</div>
  </section>
}
