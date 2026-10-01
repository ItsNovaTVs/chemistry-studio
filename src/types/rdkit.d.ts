declare module "@rdkit/rdkit" {
  export interface RDKitMol {
    get_svg(): string;
    get_smiles(): string;
    get_canonical_smiles(): string;
    get_descriptors(): string;
    get_molblock(): string;
    delete(): void;
  }
  export interface RDKitModule {
    get_mol(smiles: string): RDKitMol | null;
    version(): string;
  }
  export default function initRDKitModule(): Promise<RDKitModule>;
}
