import { useEffect } from "react";
import type { ElementData } from "../../types/chemistry";
import { useT } from "../../i18n";

export function ElementDetailModal({ element, onClose }: { element: ElementData; onClose: () => void }) {
  const t=useT();
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
  const properties: [string, string][] = [
    [t("atomicNumber"), String(element.number)],
    [t("atomicMass"), element.atomic_mass + " u"],
    [t("groupPeriod"), (element.group ?? "—") + " / " + (element.period ?? "—")],
    [t("state"), element.phase ?? "—"],
    [t("electronegativity"), element.electronegativity_pauling == null ? "—" : String(element.electronegativity_pauling)],
    [t("density"), element.density == null ? "—" : element.density + " " + (element.density_unit ?? "g/cm³")],
    [t("meltingPoint"), element.melt == null ? "—" : element.melt + " K"],
    [t("boilingPoint"), element.boil == null ? "—" : element.boil + " K"],
    [t("electronAffinity"), element.electron_affinity == null ? "—" : element.electron_affinity + " kJ/mol"],
    [t("ionization"), element.ionization_energy == null ? "—" : element.ionization_energy + " kJ/mol"],
    [t("discoveredBy"), element.discovered_by ?? "—"],
  ];
  return <div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-3 sm:p-4" onClick={onClose}>
    <section role="dialog" aria-modal="true" aria-labelledby="element-dialog-title" className="max-h-[90vh] max-w-2xl w-full overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-5 sm:p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
      <div className="flex justify-between gap-4">
        <div><div className="text-5xl font-bold text-cyan-300">{element.symbol}</div><h2 id="element-dialog-title" className="text-2xl font-bold">{element.name}</h2><p className="text-slate-400 capitalize">{element.category}</p></div>
        <button type="button" className="h-10 w-10 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" onClick={onClose} aria-label={t("close")}>✕</button>
      </div>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-5">{properties.map(([label, value]) =>
        <div className="rounded-xl bg-slate-950 p-3" key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="font-medium mt-1 break-words">{value}</dd></div>
      )}</dl>
      {element.summary && <p className="mt-5 text-sm leading-6 text-slate-300">{element.summary}</p>}
      {element.electron_configuration && <p className="mt-3 text-sm break-words"><span className="text-slate-500">{t("electronConfiguration")}:</span> {element.electron_configuration}</p>}
    </section>
  </div>;
}
