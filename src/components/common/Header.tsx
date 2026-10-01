import { FlaskConical } from "lucide-react";

export function Header() {
  return <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-300"><FlaskConical size={25}/></div>
      <div><h1 className="text-lg font-bold tracking-tight">Chemistry Studio</h1>
      <p className="text-xs text-slate-400">Periodic Table · Reaction Engine · MolView</p></div>
    </div>
  </header>
}
