import type { ElementData } from "../../types/chemistry";
export function ElementDetailModal({element,onClose}:{element:ElementData,onClose:()=>void}) {
  return <div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4" onClick={onClose}>
    <div className="max-w-xl w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl" onClick={e=>e.stopPropagation()}>
      <div className="flex justify-between gap-4"><div><div className="text-5xl font-bold text-cyan-300">{element.symbol}</div><h2 className="text-2xl font-bold">{element.name}</h2><p className="text-slate-400">{element.category}</p></div>
      <button className="text-slate-400 hover:text-white" onClick={onClose}>✕</button></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">{[
        ["Atomic number",element.number],["Atomic mass",element.atomic_mass],["Electronegativity",element.electronegativity_pauling??"—"],["Density",element.density??"—"],["Melting point",element.melt??"—"],["Boiling point",element.boil??"—"]
      ].map(([k,v])=><div className="rounded-xl bg-slate-950 p-3" key={k as string}><div className="text-xs text-slate-500">{k}</div><div className="font-medium mt-1">{v as React.ReactNode}</div></div>)}</div>
      <p className="mt-5 text-sm leading-6 text-slate-300">{element.summary}</p>
      {element.electron_configuration && <p className="mt-3 text-sm"><span className="text-slate-500">Electron configuration:</span> {element.electron_configuration}</p>}
    </div>
  </div>
}
