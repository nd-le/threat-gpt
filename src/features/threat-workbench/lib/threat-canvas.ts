import {
  HIGH_IMPACT_STRIDE_CATEGORIES,
  STRIDE_CATEGORY_DETAILS,
  STRIDE_CATEGORY_ORDER,
} from "../config/stride";
import type { StrideRow, ThreatGraphNode } from "../types";

export const getGraphNodeLabel = (
  nodesById: Map<string, ThreatGraphNode>,
  id: string,
): string => nodesById.get(id)?.label ?? id;

export const countThreatsByStrideCategory = (
  rows: StrideRow[],
): Record<string, number> => (
  rows.reduce<Record<string, number>>((acc, row) => {
    const key = row.stride.toUpperCase();
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {})
);

export const getPrimaryRiskCategory = (counts: Record<string, number>): string => {
  const [topLetter] = STRIDE_CATEGORY_ORDER.reduce<[string, number]>(
    (best, strideLetter) => {
      const count = counts[strideLetter] ?? 0;
      return count > best[1] ? [strideLetter, count] : best;
    },
    ["S", 0],
  );
  return STRIDE_CATEGORY_DETAILS[topLetter]?.label ?? "Threats";
};

export const getRiskSeverityLabel = (row: StrideRow): string => {
  if (HIGH_IMPACT_STRIDE_CATEGORIES.has(row.stride.toUpperCase())) {
    return "High";
  }
  return "Medium";
};
