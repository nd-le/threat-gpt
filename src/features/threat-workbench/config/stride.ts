export const STRIDE_CATEGORY_DETAILS: Record<string, { label: string; focus: string }> = {
  S: { label: "Spoofing", focus: "Identity abuse" },
  T: { label: "Tampering", focus: "Integrity loss" },
  R: { label: "Repudiation", focus: "Weak accountability" },
  I: { label: "Information disclosure", focus: "Data exposure" },
  D: { label: "Denial of service", focus: "Availability loss" },
  E: { label: "Elevation of privilege", focus: "Privilege abuse" },
};

export const STRIDE_CATEGORY_ORDER = ["S", "T", "R", "I", "D", "E"] as const;

export const HIGH_IMPACT_STRIDE_CATEGORIES = new Set(["S", "I", "E"]);
export const STRIDE_META: Record<string, { label: string; focus: string }> = {
  S: { label: "Spoofing", focus: "Identity abuse" },
  T: { label: "Tampering", focus: "Integrity loss" },
  R: { label: "Repudiation", focus: "Weak accountability" },
  I: { label: "Information disclosure", focus: "Data exposure" },
  D: { label: "Denial of service", focus: "Availability loss" },
  E: { label: "Elevation of privilege", focus: "Privilege abuse" },
};

export const STRIDE_ORDER = ["S", "T", "R", "I", "D", "E"] as const;

export const HIGH_SIGNAL_STRIDE = new Set(["S", "I", "E"]);
