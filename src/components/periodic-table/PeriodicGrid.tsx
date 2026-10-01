import { useState } from "react";
import elements from "../../data/periodic-table.json";
import { ElementTile } from "./ElementTile";
import { ElementDetailModal } from "./ElementDetailModal";
import type { ElementData } from "../../types/chemistry";

export function PeriodicGrid() {
  const [selected,setSelected]=useState<ElementData|null>(null);
  return <section><div className="flex justify-between items-end mb-4"><div><h2 className="text-2xl font-bold">Interactive Periodic Table</h2><p className="text-slate-400 text-sm">118 elements. Humanity finally catalogued the rocks.</p></div></div>
    <div className="periodic-grid">{(elements as ElementData[]).map(e=><ElementTile key={e.number} element={e} onClick={()=>setSelected(e)}/>)}</div>
    {selected && <ElementDetailModal element={selected} onClose={()=>setSelected(null)}/>}
  </section>
}
