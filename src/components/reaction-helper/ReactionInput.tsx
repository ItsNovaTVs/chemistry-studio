import { useState } from "react";
import { balanceReaction, splitSpecies } from "../../utils/reactionEngine";
import { useT } from "../../i18n";

export function ReactionInput() {
  const t=useT();
  const [left,setLeft]=useState("KMnO4 + HCl");
  const [right,setRight]=useState("KCl + MnCl2 + H2O + Cl2");
  const [result,setResult]=useState<string|null>(null);
  const [error,setError]=useState<string|null>(null);
  const [conditions,setConditions]=useState("None");

  function solve(){
    try {
      const r=balanceReaction(splitSpecies(left),splitSpecies(right));
      setResult(r.equation);setError(null);
    } catch(e){setError(e instanceof Error?e.message:"Could not balance reaction.");setResult(null)}
  }
  return <section className="max-w-4xl"><h2 className="text-2xl font-bold">{t("reactionTitle")}</h2><p className="text-slate-400 text-sm mt-1">{t("reactionIntro")}</p>
    <form onSubmit={e=>{e.preventDefault();solve()}}>
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      <label className="field"><span>{t("reactants")}</span><input value={left} onChange={e=>setLeft(e.target.value)} placeholder="Fe2O3 + CO"/></label>
      <label className="field"><span>{t("products")}</span><input value={right} onChange={e=>setRight(e.target.value)} placeholder="Fe + CO2"/></label>
    </div>
    <div className="mt-4 flex flex-wrap gap-3 items-end"><label className="field flex-1 min-w-48"><span>{t("conditions")}</span><input value={conditions==="None"?"":conditions} onChange={e=>setConditions(e.target.value||"None")} placeholder={t("conditionsPlaceholder")}/></label><button className="primary" type="submit">{t("balance")}</button></div>
    </form>
    {result && <div className="result-card mt-6"><div className="text-xs text-cyan-300 uppercase tracking-wider">{t("balanced")}</div><div className="equation mt-2">{result}</div>{conditions!=="None"&&<div className="text-sm text-slate-400 mt-3">{t("condition")}: <span className="text-white">{conditions}</span></div>}</div>}
    {error && <div className="error mt-4">{error}</div>}
    <div className="mt-6 text-xs text-slate-500">{t("reactionNote")}</div>
  </section>
}
