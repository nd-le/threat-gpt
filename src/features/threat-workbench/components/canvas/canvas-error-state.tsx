import {
  Text,
  VStack,
} from "@/components/ui";

type CanvasErrorStateProps = Readonly<{
  error: string;
}>;

export const CanvasErrorState = ({ error }: CanvasErrorStateProps) => (
  <VStack
    gap={3}
    className="h-full items-center justify-center p-8 text-center"
  >
    <Text tone="danger" size="md" className="font-semibold">
      Canvas could not update
    </Text>
    <Text tone="muted" size="sm" className="max-w-md">
      {error}
    </Text>
  </VStack>
);
