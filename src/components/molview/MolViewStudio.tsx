import { useState } from "react";
import { useRdkit } from "../../hooks/useRdkit";
import { usePubChem } from "../../hooks/usePubChem";
import { MoleculeCanvas } from "./MoleculeCanvas";
import { IupacInfoPanel } from "./IupacInfoPanel";
import { Viewer3D } from "./Viewer3D";
import type { PubChemCompound } from "../../types/chemistry";
import { useT } from "../../i18n";

export function MolViewStudio() {
  const t=useT();
  const { rdkit, loading: rdLoading, error: rdError } = useRdkit();
  const { lookup, smiles: resolveSmiles, sdf3d, loading, error } = usePubChem();
  const [smiles, setSmiles] = useState("CC(=O)Oc1ccccc1C(=O)O");
  const [compound, setCompound] = useState<PubChemCompound | null>(null);
  const [query, setQuery] = useState("aspirin");
  const [sdf, setSdf] = useState("");

  async function resolve() {
    const term = query.trim();
    if (!term) return;
    const data = await lookup(term);
    setCompound(data);
    const notation = await resolveSmiles(term);
    if (notation) setSmiles(notation);
    setSdf("");
  }

  async function load3d() {
    const structure = await sdf3d(query.trim());
    if (structure) setSdf(structure);
  }

  return <section>
    <h2 className="text-2xl font-bold">{t("molviewTitle")}</h2>
    <p className="text-slate-400 text-sm mt-1">{t("molviewIntro")}</p>
    {rdLoading && <div className="loading mt-5">{t("rdkitLoading")}</div>}
    {rdError && <div className="error mt-5">RDKit: {rdError}</div>}
    <div className="mt-6 grid lg:grid-cols-2 gap-5">
      <div className="panel">
        <h3 className="font-semibold mb-3">{t("smilesStructure")}</h3>
        <label className="field"><span>{t("smilesNotation")}</span><input className="field-input font-mono" value={smiles} onChange={(event) => setSmiles(event.target.value)} placeholder="CC(=O)Oc1ccccc1C(=O)O" /></label>
        <MoleculeCanvas rdkit={rdkit} smiles={smiles} />
      </div>
      <div className="space-y-5">
        <div className="panel">
          <h3 className="font-semibold mb-3">{t("compoundLookup")}</h3>
          <form className="flex gap-2" onSubmit={(event) => { event.preventDefault(); void resolve(); }}>
            <input aria-label={t("compoundLookup")} className="field-input flex-1 min-w-0" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="aspirin" />
            <button className="primary" type="submit" disabled={loading || !query.trim()}>{loading ? t("loading") : t("lookup")}</button>
          </form>
          {error && <div role="alert" className="error mt-3">{error}</div>}
          <div className="mt-4"><IupacInfoPanel data={compound} /></div>
        </div>
        <div className="panel">
          <h3 className="font-semibold mb-3">{t("viewer3d")}</h3>
          <Viewer3D sdf={sdf} loading={loading} onLoad={() => void load3d()} />
        </div>
      </div>
    </div>
  </section>;
}
