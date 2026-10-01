import type { PubChemCompound } from "../../types/chemistry";
export function IupacInfoPanel({data}:{data:PubChemCompound|null}) {
  if(!data)return <div className="empty">Resolve a chemical name with PubChem to inspect its properties.</div>;
  return <div className="grid grid-cols-2 gap-3">{[["IUPAC name",data.IUPACName],["Formula",data.MolecularFormula],["Molecular weight",data.MolecularWeight],["Title",data.Title]].map(([k,v])=><div className="info" key={k as string}><div className="text-xs text-slate-500">{k}</div><div className="mt-1 break-words">{v||"—"}</div></div>)}</div>
}
