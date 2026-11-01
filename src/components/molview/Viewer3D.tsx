import { useEffect, useRef, useState } from "react";
import type { GLViewer } from "3dmol";
import { useT } from "../../i18n";

export function Viewer3D({ sdf, loading, onLoad }: { sdf: string; loading: boolean; onLoad: () => void }) {
  const target = useRef<HTMLDivElement>(null);
  const viewer = useRef<GLViewer | null>(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const t=useT();

  useEffect(() => {
    let alive=true;
    let instance:GLViewer|null=null;
    void import("3dmol").then(({createViewer})=>{
      if(!alive||!target.current)return;
      instance=createViewer(target.current,{backgroundColor:"#020617"});
      viewer.current=instance;
      setReady(true);
    }).catch(cause=>setError(cause instanceof Error?cause.message:"Could not load the 3D viewer."));
    return () => {
      alive=false;
      instance?.clear();
      viewer.current = null;
    };
  }, []);

  useEffect(() => {
    const instance = viewer.current;
    if (!instance || !ready || !sdf) return;
    try {
      instance.removeAllModels();
      instance.addModel(sdf, "sdf");
      instance.setStyle({}, { stick: { radius: 0.16, colorscheme: "Jmol" }, sphere: { scale: 0.24 } });
      instance.zoomTo();
      instance.resize();
      instance.render();
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not display this 3D structure.");
    }
  }, [sdf, ready]);

  return <div>
    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
      <p className="text-sm text-slate-400">{t("pubchem3d")}</p>
      <button className="primary" onClick={onLoad} disabled={loading}>{loading ? t("loading") : t("load3d")}</button>
    </div>
    {error && <div className="error mb-3">{error}</div>}
    <div ref={target} className="viewer-3d" aria-label="Interactive three-dimensional molecular viewer" />
    {!sdf && <p className="mt-2 text-xs text-slate-500">{t("enterName3d")}</p>}
  </div>;
}
