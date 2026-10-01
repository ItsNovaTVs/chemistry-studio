import { useState } from "react";
import { Header } from "./components/common/Header";
import { NavigationTabs, type Tab } from "./components/common/NavigationTabs";
import { PeriodicGrid } from "./components/periodic-table/PeriodicGrid";
import { ReactionInput } from "./components/reaction-helper/ReactionInput";
import { MolViewStudio } from "./components/molview/MolViewStudio";

export default function App() {
  const [tab,setTab]=useState<Tab>("periodic");
  return <div className="min-h-screen"><Header/><main className="max-w-7xl mx-auto px-4 py-6">
    <NavigationTabs tab={tab} setTab={setTab}/>
    <div className="mt-7">{tab==="periodic"?<PeriodicGrid/>:tab==="reaction"?<ReactionInput/>:<MolViewStudio/>}</div>
  </main></div>
}
