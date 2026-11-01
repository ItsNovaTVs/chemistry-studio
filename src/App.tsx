import { Header } from "./components/common/Header";
import { NavigationTabs, type Tab } from "./components/common/NavigationTabs";
import { PeriodicGrid } from "./components/periodic-table/PeriodicGrid";
import { ReactionInput } from "./components/reaction-helper/ReactionInput";
import { MolViewStudio } from "./components/molview/MolViewStudio";
import { LanguageContext, type Language } from "./i18n";
import { useState } from "react";

export default function App() {
  const [tab,setTab]=useState<Tab>("periodic");
  const [language,setLanguage]=useState<Language>("en");
  return <LanguageContext.Provider value={{language,setLanguage}}><div className="min-h-screen" lang={language}><Header/><main className="max-w-7xl mx-auto px-4 py-6">
    <NavigationTabs tab={tab} setTab={setTab}/>
    <div className="mt-7">{tab==="periodic"?<PeriodicGrid/>:tab==="reaction"?<ReactionInput/>:<MolViewStudio/>}</div>
  </main></div></LanguageContext.Provider>
}
