import { useEffect, useState } from "react";
import type { MainModule } from "@rdkit/rdkit";
import { useT } from "../../i18n";

export function MoleculeCanvas({rdkit,smiles}:{rdkit:MainModule|null,smiles:string}) {
  const t=useT();
  const [svg,setSvg]=useState("");
  const [error,setError]=useState("");
  useEffect(()=>{
    setSvg("");
    if(!rdkit||!smiles.trim()) return;
    let mol: ReturnType<MainModule["get_mol"]> = null;
    try {
      mol=rdkit.get_mol(smiles);
      if(!mol) throw new Error(t("invalidSmiles"));
      setSvg(mol.get_svg(600,420));
      setError("");
    } catch(e){setError(e instanceof Error?e.message:"Unable to render molecule.");}
    finally { mol?.delete(); }
  },[rdkit,smiles,t]);
  if(error)return <div className="error">{error}</div>;
  if(!svg)return <div className="empty">{t("emptySmiles")}</div>;
  return <div className="molecule-canvas" dangerouslySetInnerHTML={{__html:svg}}/>;
}
