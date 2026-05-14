import {
  Heading,
  Pill,
  Table,
  TableScroll,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "@/components/ui";

import { STRIDE_CATEGORY_DETAILS } from "../../config/stride";
import { getRiskSeverityLabel } from "../../lib/threat-canvas";
import type { StrideRow, ThreatMitigation } from "../../types";

import { SectionHeader } from "./section-header";

type RiskRegisterProps = Readonly<{
  mitigations: ThreatMitigation[];
  stride: StrideRow[];
}>;

const linkedMitigations = (
  mitigations: ThreatMitigation[],
  threatId: string,
) => mitigations.filter((item) => item.threatId === threatId);

const unlinkedMitigations = (mitigations: ThreatMitigation[]) => (
  mitigations.filter((item) => !item.threatId)
);

export const RiskRegister = ({ mitigations, stride }: RiskRegisterProps) => {
  const additionalControls = unlinkedMitigations(mitigations);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <SectionHeader
        title="Threats and mitigations"
        description="Threat scenarios are paired with the controls required to reduce or accept the risk."
      />
      <TableScroll>
        <Table>
          <THead>
            <Tr>
              <Th className="w-20">ID</Th>
              <Th className="w-40">STRIDE</Th>
              <Th>Threat scenario</Th>
              <Th>Impact / rationale</Th>
              <Th>Recommended mitigation</Th>
            </Tr>
          </THead>
          <TBody>
            {stride.map((row) => {
              const rowMitigations = linkedMitigations(mitigations, row.id);

              return (
                <Tr key={row.id}>
                  <Td className="align-top font-mono text-zinc-500">{row.id}</Td>
                  <Td className="align-top">
                    <Pill tone="default" caption={row.stride} className="inline-block py-1">
                      {STRIDE_CATEGORY_DETAILS[row.stride]?.label ?? row.stride}
                    </Pill>
                    <div className="mt-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {getRiskSeverityLabel(row)}
                    </div>
                  </Td>
                  <Td className="align-top">{row.threat}</Td>
                  <Td className="align-top text-zinc-600 dark:text-zinc-400">
                    {row.note ?? "-"}
                  </Td>
                  <Td className="align-top">
                    {rowMitigations.length > 0 ? (
                      <ul className="space-y-3">
                        {rowMitigations.map((item) => (
                          <li key={item.id}>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100">
                              {item.title}
                            </div>
                            <div className="mt-1 text-zinc-600 dark:text-zinc-400">
                              {item.action}
                            </div>
                            <div className="mt-2 text-xs text-zinc-500">
                              {item.priority ?? "P1"}
                              {item.owner ? ` · ${item.owner}` : ""}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-zinc-500">
                        No linked mitigation captured.
                      </span>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </TableScroll>

      {additionalControls.length > 0 ? (
        <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <Heading as="h3" className="mb-3">
            Cross-cutting controls
          </Heading>
          <ul className="space-y-3 text-sm">
            {additionalControls.map((item) => (
              <li key={item.id}>
                <span className="font-medium">{item.title}</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {" - "}
                  {item.action}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};
