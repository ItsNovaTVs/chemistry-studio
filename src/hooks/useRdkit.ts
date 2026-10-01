import { useEffect, useState } from "react";
import initRDKitModule from "@rdkit/rdkit";
import type { RDKitModule } from "../types/rdkit";

export function useRdkit() {
  const [rdkit, setRdkit] = useState<RDKitModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    initRDKitModule()
      .then((module) => { if (alive) setRdkit(module); })
      .catch((err: unknown) => {
        if (alive) setError(err instanceof Error ? err.message : "RDKit failed to load.");
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { rdkit, loading, error };
}
