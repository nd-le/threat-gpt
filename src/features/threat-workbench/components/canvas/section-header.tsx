import { Heading, Text } from "@/components/ui";

type SectionHeaderProps = Readonly<{
  title: string;
  description: string;
}>;

export const SectionHeader = ({ title, description }: SectionHeaderProps) => (
  <div className="mb-4">
    <Heading as="h3" className="mb-1">
      {title}
    </Heading>
    <Text tone="muted" size="sm">
      {description}
    </Text>
  </div>
);
