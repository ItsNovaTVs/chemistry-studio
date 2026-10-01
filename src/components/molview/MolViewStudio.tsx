import { useState } from "react";
import { useRdkit } from "../../hooks/useRdkit";
import { usePubChem } from "../../hooks/usePubChem";
import { MoleculeCanvas } from "./MoleculeCanvas";
import { SmilesInput } from "./SmilesInput";
import { IupacInfoPanel } from "./IupacInfoPanel";
import { Viewer3D } from "./Viewer3D";

export function MolViewStudio() {
  const {rdkit,loading:rdLoading,error:rdError}=useRdkit();
  const {lookup,smiles:resolveSmiles,loading,error}=usePubChem();
  const [smiles,setSmiles]=useState("CC(=O)Oc1ccccc1C(=O)O");
  const [compound,setCompound]=useState<any>(null);
  const [query,setQuery]=useState("aspirin");

  async function resolve() {
    const s=await resolveSmiles(query);
    if(s)setSmiles(s);
    setCompound(await lookup(query));
  }

  return <section><h2 className="text-2xl font-bold">MolView & IUPAC Studio</h2><p className="text-slate-400 text-sm mt-1">2D rendering uses RDKit WASM. Name lookup uses PubChem as a client-side fallback.</p>
    {rdLoading&&<div className="loading mt-5">Loading RDKit WASM…</div>}
    {rdError&&<div className="error mt-5">RDKit: {rdError}</div>}
    <div className="mt-6 grid lg:grid-cols-2 gap-5">
      <div className="panel"><h3 className="font-semibold mb-3">SMILES</h3><SmilesInput smiles={smiles} setSmiles={setSmiles} onSearch={()=>setSmiles(smiles)} loading={rdLoading}/><MoleculeCanvas rdkit={rdkit} smiles={smiles}/></div>
      <div className="space-y-5"><div className="panel"><h3 className="font-semibold mb-3">Chemical name lookup</h3><div className="flex gap-2"><input className="field-input flex-1" value={query} onChange={e=>setQuery(e.target.value)} placeholder="aspirin"/><button className="primary" onClick={resolve} disabled={loading}>{loading?"…":"Lookup"}</button></div>{error&&<div className="error mt-3">{error}</div>}<div className="mt-4"><IupacInfoPanel data={compound}/></div></div><div className="panel"><h3 className="font-semibold mb-3">3D</h3><Viewer3D/></div></div>
    </div>
  </section>
}
