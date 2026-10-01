import type { ElementData } from "../../types/chemistry";
export function ElementTile({element,onClick}:{element:ElementData,onClick:()=>void}) {
  return <button onClick={onClick} className="element-tile text-left" title={element.name}>
    <span className="text-[10px] text-slate-400">{element.number}</span>
    <strong className="text-lg">{element.symbol}</strong>
    <span className="text-[9px] truncate">{element.name}</span>
  </button>
}
