import type { UIMessage } from "ai";

import type { ThreatDocData } from "./threat-doc";

export type ThreatWorkbenchDataTypes = {
  threatDoc: ThreatDocData;
};

export type ThreatWorkbenchMessage = UIMessage<
  unknown,
  ThreatWorkbenchDataTypes
>;
