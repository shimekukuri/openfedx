// Define the union type of key names
export type PackageTypeUnion =
  | "YOUR_PACKAGING"
  | "YOUR_PACKAGING_GROUND"
  | "FEDEX_ENVELOPE"
  | "FEDEX_BOX"
  | "FEDEX_SMALL_BOX"
  | "FEDEX_MEDIUM_BOX"
  | "FEDEX_LARGE_BOX"
  | "FEDEX_EXTRA_LARGE_BOX"
  | "FEDEX_10KG_BOX"
  | "FEDEX_25KG_BOX"
  | "FEDEX_PAK"
  | "FEDEX_TUBE";

// Create an object with union types as keys and kg/lb values for each key
export const packageTypeWeights: Record<PackageTypeUnion, { kg: number; lb: number }> =
  {
    YOUR_PACKAGING: { kg: 68, lb: 150 },
    YOUR_PACKAGING_GROUND: { kg: 32, lb: 70 },
    FEDEX_ENVELOPE: { kg: 0.5, lb: 1 },
    FEDEX_BOX: { kg: 9, lb: 20 },
    FEDEX_SMALL_BOX: { kg: 9, lb: 20 },
    FEDEX_MEDIUM_BOX: { kg: 9, lb: 20 },
    FEDEX_LARGE_BOX: { kg: 9, lb: 20 },
    FEDEX_EXTRA_LARGE_BOX: { kg: 9, lb: 20 },
    FEDEX_10KG_BOX: { kg: 10, lb: 22 },
    FEDEX_25KG_BOX: { kg: 25, lb: 55 },
    FEDEX_PAK: { kg: 9, lb: 20 },
    FEDEX_TUBE: { kg: 9, lb: 20 },
  };

