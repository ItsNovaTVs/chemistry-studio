export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  category: string;
  atomic_mass: number;
  electronegativity_pauling?: number;
  electron_configuration?: string;
  density?: number;
  melt?: number;
  boil?: number;
  summary?: string;
}

export interface ReactionResult {
  coefficients: number[];
  reactants: string[];
  products: string[];
  equation: string;
}

export interface PubChemCompound {
  CID?: number;
  MolecularFormula?: string;
  MolecularWeight?: string;
  IUPACName?: string;
  Title?: string;
}
