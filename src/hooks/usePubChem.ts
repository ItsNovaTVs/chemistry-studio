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

  return { lookup, smiles, loading, error };
}
