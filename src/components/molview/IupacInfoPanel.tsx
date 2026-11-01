import type { PubChemCompound } from "../../types/chemistry";
import { useT } from "../../i18n";
export function IupacInfoPanel({data}:{data:PubChemCompound|null}) {
  const t=useT();
  if(!data)return <div className="empty">{t("pubchemPrompt")}</div>;
  return <div className="grid grid-cols-2 gap-3">{[[t("iupacName"),data.IUPACName],[t("formula"),data.MolecularFormula],[t("molecularWeight"),data.MolecularWeight],[t("title"),data.Title]].map(([k,v])=><div className="info" key={k as string}><div className="text-xs text-slate-500">{k}</div><div className="mt-1 break-words">{v||"—"}</div></div>)}</div>
}
