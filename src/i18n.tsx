import { createContext, useCallback, useContext } from "react";

export type Language = "en" | "de";
export const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: "en",
  setLanguage: () => undefined,
});

const translations = {
  en: {
    subtitle: "Periodic Table · Reaction Engine · MolView",
    periodic: "Periodic Table", reaction: "Reaction Balancer", molview: "MolView Studio",
    periodicTitle: "Interactive Periodic Table", periodicIntro: "All 118 elements with physical and atomic properties.",
    findElement: "Find an element", searchPlaceholder: "Name, symbol, or atomic number", categoryKey: "Element category color key",
    noElements: "No elements match", pointNote: "Melting and boiling points are in kelvin. Density is shown in g/cm³. Some values for short-lived synthetic elements are estimates or unavailable.",
    atomicNumber: "Atomic number", atomicMass: "Atomic mass", groupPeriod: "Group / period", state: "State at room temperature",
    electronegativity: "Electronegativity", density: "Density", meltingPoint: "Melting point", boilingPoint: "Boiling point",
    electronAffinity: "Electron affinity", ionization: "First ionization energy", discoveredBy: "Discovered by",
    close: "Close element details", electronConfiguration: "Electron configuration",
    reactionTitle: "Reaction Engine", reactionIntro: "Enter formulas separated by +. Use spaces around + to separate ionic species. Balancing uses exact rational arithmetic.",
    reactants: "Reactants", products: "Products", conditions: "Condition / catalyst (optional)", conditionsPlaceholder: "e.g. heat, Pt, acidic solution",
    balance: "Balance equation", balanced: "Balanced equation", condition: "Condition", reactionNote: "Balancing checks atom and charge counts; it does not predict whether the reaction occurs.",
    molviewTitle: "MolView & IUPAC Studio", molviewIntro: "RDKit draws 2D structures. PubChem provides compound properties and available 3D conformers.",
    rdkitLoading: "Loading RDKit WebAssembly…", smilesStructure: "SMILES structure", smilesNotation: "SMILES notation",
    compoundLookup: "Chemical name / PubChem lookup", lookup: "Lookup", loading: "Loading…",
    viewer3d: "Interactive 3D structure", pubchem3d: "Fetches an available 3D conformer from PubChem.",
    load3d: "Load 3D structure", enterName3d: "Enter a compound name in the lookup panel first. Rotation and zoom are available after loading.",
    invalidSmiles: "Invalid SMILES string.", emptySmiles: "Enter a valid SMILES string to render the molecule.",
    iupacName: "IUPAC name", formula: "Formula", molecularWeight: "Molecular weight", title: "Title",
    pubchemPrompt: "Resolve a chemical name with PubChem to inspect its properties.",
    language: "Deutsch",
  },
  de: {
    subtitle: "Periodensystem · Reaktionsausgleich · MolView",
    periodic: "Periodensystem", reaction: "Reaktionen ausgleichen", molview: "MolView-Studio",
    periodicTitle: "Interaktives Periodensystem", periodicIntro: "Alle 118 Elemente mit physikalischen und atomaren Eigenschaften.",
    findElement: "Element suchen", searchPlaceholder: "Name, Symbol oder Ordnungszahl", categoryKey: "Farblegende der Elementkategorien",
    noElements: "Keine passenden Elemente für", pointNote: "Schmelz- und Siedepunkte in Kelvin. Dichte in g/cm³. Einige Werte kurzlebiger synthetischer Elemente sind Schätzungen oder nicht verfügbar.",
    atomicNumber: "Ordnungszahl", atomicMass: "Atommasse", groupPeriod: "Gruppe / Periode", state: "Aggregatzustand bei Raumtemperatur",
    electronegativity: "Elektronegativität", density: "Dichte", meltingPoint: "Schmelzpunkt", boilingPoint: "Siedepunkt",
    electronAffinity: "Elektronenaffinität", ionization: "Erste Ionisierungsenergie", discoveredBy: "Entdeckt von",
    close: "Elementdetails schließen", electronConfiguration: "Elektronenkonfiguration",
    reactionTitle: "Reaktionsausgleich", reactionIntro: "Formeln mit + trennen. Um Ionen zu trennen, Leerzeichen um + setzen. Der Ausgleich verwendet exakte Bruchrechnung.",
    reactants: "Edukte", products: "Produkte", conditions: "Bedingung / Katalysator (optional)", conditionsPlaceholder: "z. B. Wärme, Pt, saure Lösung",
    balance: "Reaktion ausgleichen", balanced: "Ausgeglichene Reaktion", condition: "Bedingung", reactionNote: "Der Ausgleich prüft Atom- und Ladungsbilanzen. Er sagt nicht voraus, ob die Reaktion stattfindet.",
    molviewTitle: "MolView- und IUPAC-Studio", molviewIntro: "RDKit zeichnet 2D-Strukturen. PubChem liefert Stoffeigenschaften und verfügbare 3D-Konformere.",
    rdkitLoading: "RDKit WebAssembly wird geladen…", smilesStructure: "SMILES-Struktur", smilesNotation: "SMILES-Notation",
    compoundLookup: "Stoffname / PubChem-Suche", lookup: "Suchen", loading: "Lädt…",
    viewer3d: "Interaktive 3D-Struktur", pubchem3d: "Lädt ein verfügbares 3D-Konformer von PubChem.",
    load3d: "3D-Struktur laden", enterName3d: "Zuerst einen Stoffnamen in der Suche eingeben. Nach dem Laden kann die Struktur gedreht und gezoomt werden.",
    invalidSmiles: "Ungültige SMILES-Notation.", emptySmiles: "Gültige SMILES-Notation eingeben, um das Molekül darzustellen.",
    iupacName: "IUPAC-Name", formula: "Formel", molecularWeight: "Molekülmasse", title: "Bezeichnung",
    pubchemPrompt: "Einen Stoffnamen mit PubChem suchen, um seine Eigenschaften anzuzeigen.",
    language: "English",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export function useLanguage() { return useContext(LanguageContext); }
export function useT() {
  const { language } = useLanguage();
  return useCallback((key: TranslationKey) => translations[language][key], [language]);
}
