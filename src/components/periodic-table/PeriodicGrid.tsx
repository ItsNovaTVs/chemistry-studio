import { useMemo, useState } from "react";
import elements from "../../data/periodic-table.json";
import { ElementTile } from "./ElementTile";
import { ElementDetailModal } from "./ElementDetailModal";
import type { ElementData } from "../../types/chemistry";
import { useT } from "../../i18n";

const categories = [...new Set((elements as ElementData[]).map((element) => element.category))];

export function PeriodicGrid() {
  const [selected, setSelected] = useState<ElementData | null>(null);
  const [query, setQuery] = useState("");
  const t=useT();
  const matches = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return (elements as ElementData[]).filter((element) => !term || [element.name, element.symbol, element.category, String(element.number)].some((value) => value?.toLocaleLowerCase().includes(term)));
  }, [query]);

  return <section>
    <div className="flex flex-wrap justify-between items-end gap-4 mb-4">
      <div><h2 className="text-2xl font-bold">{t("periodicTitle")}</h2><p className="text-slate-400 text-sm mt-1">{t("periodicIntro")}</p></div>
      <label className="field w-full sm:w-72"><span>{t("findElement")}</span><input className="field-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchPlaceholder")} /></label>
    </div>
    <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400" aria-label={t("categoryKey")}>
      {categories.map((category) => <span key={category} className="inline-flex items-center gap-1.5"><i aria-hidden="true" className="h-2.5 w-2.5 rounded-sm border border-white/20" data-category={category} />{category}</span>)}
    </div>
    <div className="overflow-x-auto rounded-xl" tabIndex={0} aria-label="Scrollable periodic table">
      <div className="periodic-grid">
        {matches.map((element) => <ElementTile key={element.number} element={element} onClick={() => setSelected(element)} />)}
      </div>
    </div>
    {matches.length === 0 && <p className="empty mt-4">{t("noElements")} “{query}”.</p>}
    <p className="mt-3 text-xs text-slate-500">{t("pointNote")}</p>
    {selected && <ElementDetailModal element={selected} onClose={() => setSelected(null)} />}
  </section>;
}
