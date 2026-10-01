# Chemistry Studio

Client-side chemistry toolkit for GitHub Pages.

## Features
- Interactive 118-element periodic table
- Exact-rational reaction balancing for standard chemical formulae
- Catalyst/condition UI
- PubChem name/property lookup
- RDKit WASM 2D molecular rendering
- 3Dmol dependency ready for 3D visualization work

## Development
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm run preview
```

The Vite base is `./`, so the app is designed for static GitHub Pages hosting.

## Important scope note
The reaction engine balances stoichiometry. It does not infer whether an arbitrary reaction actually occurs, its mechanism, thermodynamics, or kinetics. PubChem is used as a client-side lookup service rather than a backend.
