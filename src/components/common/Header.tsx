import { FlaskConical } from "lucide-react";
import { useLanguage, useT } from "../../i18n";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const t = useT();
  return <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-300"><FlaskConical size={25}/></div>
      <div className="min-w-0"><h1 className="text-lg font-bold tracking-tight">Chemistry Studio</h1>
      <p className="text-xs text-slate-400">{t("subtitle")}</p></div>
      <button type="button" className="ml-auto rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800" onClick={() => setLanguage(language === "en" ? "de" : "en")} aria-label={"Switch language to " + t("language")}>{t("language")}</button>
    </div>
  </header>
}
