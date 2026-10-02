# Chemistry Studio

**Chemistry Studio** is a client-side chemistry toolkit designed for GitHub Pages. No backend is required for the core app.

## 🇬🇧 English

### Features

- Interactive periodic table with all 118 elements
- Exact-rational reaction balancing for standard chemical formulae
- Catalyst and reaction-condition input
- PubChem name/property lookup
- RDKit WASM 2D molecular rendering
- 3Dmol integration prepared for 3D visualization
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

---

## 🇩🇪 Deutsch

### Funktionen

- Interaktives Periodensystem mit allen 118 Elementen
- Exaktes Ausgleichen chemischer Reaktionsgleichungen
- Eingabe von Katalysatoren und Reaktionsbedingungen
- Namens- und Eigenschaftssuche über PubChem
- 2D-Moleküldarstellung mit RDKit WASM
- Vorbereitung für 3D-Moleküldarstellung mit 3Dmol
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
