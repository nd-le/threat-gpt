import {
  BubbleBody,
  MessageBubble,
  VStack,
} from "@/components/ui";

import { getVisibleMessageText } from "../../lib/assistant-display-text";
import type { ThreatWorkbenchMessage } from "../../types";

type ChatMessageListProps = Readonly<{
  messages: ThreatWorkbenchMessage[];
}>;

const roleLabel = (role: ThreatWorkbenchMessage["role"]) => (
  role === "user" ? "You" : "Assistant"
);

export const ChatMessageList = ({ messages }: ChatMessageListProps) => (
  <VStack gap={3} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
    {messages.map((message) => {
      const text = getVisibleMessageText(message);
      if (!text) {
        return null;
      }

      return (
        <MessageBubble
          key={message.id}
          role={message.role === "user" ? "user" : "assistant"}
          label={roleLabel(message.role)}
        >
          <BubbleBody>{text}</BubbleBody>
        </MessageBubble>
      );
    })}
  </VStack>
);
