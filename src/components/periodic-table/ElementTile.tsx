import type { CSSProperties } from "react";
import type { ElementData } from "../../types/chemistry";

export function ElementTile({ element, onClick }: { element: ElementData; onClick: () => void }) {
  const position: CSSProperties = element.xpos && element.ypos
    ? { gridColumn: element.xpos, gridRow: element.ypos }
    : {};
  return <button
    type="button"
    onClick={onClick}
    className="element-tile text-left"
    style={position}
    data-category={element.category}
    aria-label={element.number + ": " + element.name + ", " + element.symbol}
    title={element.name}
  >
    <span className="text-[10px] text-slate-300">{element.number}</span>
    <strong className="text-lg leading-5">{element.symbol}</strong>
    <span className="text-[9px] leading-3 truncate">{element.name}</span>
    <span className="text-[9px] text-slate-300 truncate">{element.atomic_mass}</span>
  </button>;
}
