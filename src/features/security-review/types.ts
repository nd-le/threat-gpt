/**
 * Domain types for the security review feature.
 * Expand as you model repos, scans, findings, and human sign-off.
 */
export type ReviewStatus = "draft" | "in_progress" | "blocked" | "complete";

export type SecurityReview = {
  id: string;
  title: string;
  status: ReviewStatus;
  createdAt: string;
};
