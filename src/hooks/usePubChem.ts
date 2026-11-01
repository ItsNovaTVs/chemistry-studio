import { useState } from "react";
import type { PubChemCompound } from "../types/chemistry";

const API = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

export function usePubChem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup(query: string): Promise<PubChemCompound | null> {
    setLoading(true); setError(null);
    try {
      const encoded = encodeURIComponent(query.trim());
      const res = await fetch(`${API}/compound/name/${encoded}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`);
      if (!res.ok) throw new Error(`PubChem returned ${res.status}.`);
      const data = await res.json();
      const p = data?.PropertyTable?.Properties?.[0];
      return p ? p as PubChemCompound : null;
    } catch (e) {
      setError(e instanceof Error ? e.message : "PubChem lookup failed.");
      return null;
    } finally { setLoading(false); }
  }

  async function smiles(query: string): Promise<string | null> {
    setLoading(true); setError(null);
    try {
      const encoded = encodeURIComponent(query.trim());
      const res = await fetch(`${API}/compound/name/${encoded}/property/CanonicalSMILES/JSON`);
      if (!res.ok) throw new Error(`PubChem returned ${res.status}.`);
      const data = await res.json();
      return data?.PropertyTable?.Properties?.[0]?.ConnectivitySMILES ?? data?.PropertyTable?.Properties?.[0]?.CanonicalSMILES ?? null;
    } catch (e) {
      setError(e instanceof Error ? e.message : "PubChem lookup failed.");
      return null;
    } finally { setLoading(false); }
  }

  async function sdf3d(query: string): Promise<string | null> {
    setLoading(true); setError(null);
    try {
      const encoded = encodeURIComponent(query.trim());
      const res = await fetch(API + "/compound/name/" + encoded + "/SDF?record_type=3d");
      if (!res.ok) {
        if (res.status === 404) throw new Error("PubChem has no 3D conformer for this compound.");
        throw new Error("PubChem returned " + res.status + ".");
      }
      const sdf = await res.text();
      if (!sdf.includes("V2000") && !sdf.includes("V3000")) throw new Error("PubChem returned no usable 3D structure.");
      return sdf;
    } catch (e) {
      setError(e instanceof Error ? e.message : "3D structure lookup failed.");
      return null;
    } finally { setLoading(false); }
  }

  return { lookup, smiles, sdf3d, loading, error };
}
