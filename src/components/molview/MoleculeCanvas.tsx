import { useEffect, useState } from "react";
import type { RDKitModule } from "../../types/rdkit";

export function MoleculeCanvas({rdkit,smiles}:{rdkit:RDKitModule|null,smiles:string}) {
  const [svg,setSvg]=useState("");
  const [error,setError]=useState("");
  useEffect(()=>{
    if(!rdkit||!smiles)return;
    try { const mol=rdkit.get_mol(smiles); if(!mol) throw new Error("Invalid SMILES"); const out=mol.get_svg(); mol.delete(); setSvg(out); setError(""); }
    catch(e){setSvg("");setError(e instanceof Error?e.message:"Unable to render molecule.");}
  },[rdkit,smiles]);
  if(error)return <div className="error">{error}</div>;
  if(!svg)return <div className="empty">Enter a valid SMILES string to render the molecule.</div>;
  return <div className="molecule-canvas" dangerouslySetInnerHTML={{__html:svg}}/>;
}
