export type Tab = "periodic" | "reaction" | "molview";
export function NavigationTabs({tab,setTab}:{tab:Tab,setTab:(t:Tab)=>void}) {
  const items:[Tab,string][]=[["periodic","Periodic Table"],["reaction","Reaction Engine"],["molview","MolView Studio"]];
  return <nav className="flex gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
    {items.map(([id,label])=><button key={id} onClick={()=>setTab(id)}
      className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${tab===id?"bg-cyan-500 text-slate-950 font-semibold":"text-slate-300 hover:bg-slate-800"}`}>{label}</button>)}
  </nav>
}
