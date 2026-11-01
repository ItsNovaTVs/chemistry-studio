# Chemistry Studio

**Chemistry Studio** is a client-side chemistry toolkit designed for GitHub Pages. No backend is required for the core app.

## 🇬🇧 English

### Features

- Interactive periodic table with all 118 elements
- Exact-rational reaction balancing for nested formula groups, hydrates, and ionic charges
- Catalyst and reaction-condition input
- PubChem name/property lookup
- RDKit WASM 2D molecular rendering
- Interactive 3D molecular viewing using conformers available from PubChem
- English and German app interface
- Responsive interface for desktop, tablet, and mobile use

### Development

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```

### GitHub Pages

This repository is deployed as a Vite application under:

**https://itsnovatvs.github.io/chemistry-studio/**

The Vite configuration uses `/chemistry-studio/` as its base path because this is a project repository rather than a user-site repository.

GitHub Pages should use **Settings → Pages → Source → GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds the app and publishes the generated `dist` directory.

### Scope

The reaction engine balances stoichiometry. It does **not** determine whether an arbitrary reaction actually occurs, nor does it calculate reaction mechanisms, thermodynamics, or kinetics.

PubChem is used as a client-side lookup service. The project does not require a custom backend for that lookup.

### Data and limitations

Periodic-table data is adapted from [Bowserinator/Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The source dataset includes references and notes that some values for synthetic elements are estimates. Temperature values are in kelvin; gas densities are converted to g/cm³ where the dataset supplies a gas-density value.

The 3D viewer requests a PubChem 3D SDF conformer for the entered compound. Not every compound has a deposited 3D conformer, in which case the app reports that it is unavailable. RDKit renders the user-editable SMILES as a 2D depiction; it does not invent 3D coordinates. Regression tests for formula parsing and balancing run with npm test.

---

## 🇩🇪 Deutsch

### Funktionen

- Interaktives Periodensystem mit allen 118 Elementen
- Exaktes Ausgleichen chemischer Reaktionsgleichungen
- Eingabe von Katalysatoren und Reaktionsbedingungen
- Namens- und Eigenschaftssuche über PubChem
- 2D-Moleküldarstellung mit RDKit WASM
- Interaktive 3D-Moleküldarstellung mit bei PubChem verfügbaren Konformeren
- App-Oberfläche auf Englisch und Deutsch
- Responsive Oberfläche für Desktop, Tablet und Smartphone

### Entwicklung

```bash
npm install
npm run dev
```

### Produktions-Build

```bash
npm run build
npm run preview
```

### GitHub Pages

Dieses Repository wird als Vite-Anwendung unter folgender Adresse veröffentlicht:

**https://itsnovatvs.github.io/chemistry-studio/**

Da es sich um ein normales Projekt-Repository und nicht um ein User-Site-Repository handelt, verwendet die Vite-Konfiguration den Base-Pfad `/chemistry-studio/`.

Für GitHub Pages muss unter **Settings → Pages → Source → GitHub Actions** ausgewählt werden. Der Workflow unter `.github/workflows/deploy.yml` erstellt die Anwendung und veröffentlicht anschließend den erzeugten `dist`-Ordner.

### Funktionsumfang

Die Reaktions-Engine gleicht die Stöchiometrie aus. Sie entscheidet **nicht**, ob eine beliebige Reaktion tatsächlich stattfindet, und berechnet keine Reaktionsmechanismen, Thermodynamik oder Kinetik.

PubChem wird als clientseitiger Suchdienst verwendet. Für diese Suche ist kein eigenes Backend erforderlich.

### Daten und Einschränkungen

Die Daten des Periodensystems wurden aus [Bowserinator/Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON) übernommen und angepasst. Sie stehen unter [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Der Datensatz enthält Quellenangaben und weist darauf hin, dass manche Werte synthetischer Elemente Schätzungen sind. Temperaturen werden in Kelvin angegeben; Gasdichten sind, sofern vorhanden, in g/cm³ umgerechnet.

Der 3D-Viewer lädt ein bei PubChem verfügbares 3D-SDF-Konformer. Nicht für jeden Stoff liegt ein solches Konformer vor; in diesem Fall meldet die Anwendung, dass es nicht verfügbar ist. RDKit zeichnet die bearbeitbare SMILES-Notation zweidimensional und erzeugt keine 3D-Koordinaten. Die Regressionstests für Formeln und Reaktionsausgleich startest du mit npm test.
