import { useEffect, useState } from "react";
import initRDKitModule, { type MainModule } from "@rdkit/rdkit";
import rdkitWasmUrl from "@rdkit/rdkit/RDKit_minimal.wasm?url";

export function useRdkit() {
  const [rdkit, setRdkit] = useState<MainModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    initRDKitModule({ locateFile: (file: string) => file.endsWith(".wasm") ? rdkitWasmUrl : file })
      .then((module) => { if (alive) setRdkit(module); })
      .catch((err: unknown) => {
        if (alive) setError(err instanceof Error ? err.message : "RDKit failed to load.");
      })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { rdkit, loading, error };
}
