import { Search } from "lucide-react";
export function SmilesInput({smiles,setSmiles,onSearch,loading}:{smiles:string,setSmiles:(s:string)=>void,onSearch:()=>void,loading:boolean}) {
  return <div className="flex gap-2"><input className="field-input flex-1 font-mono" value={smiles} onChange={e=>setSmiles(e.target.value)} placeholder="CC(=O)Oc1ccccc1C(=O)O"/>
  <button className="primary px-4" onClick={onSearch} disabled={loading}><Search size={17}/>{loading?"…":"Resolve"}</button></div>
}
