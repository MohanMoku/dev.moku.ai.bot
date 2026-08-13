import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { UserMessage } from "./user-message";
import { AssistantMessage } from "./assistant-message";

interface ChatWindowProps {
  messages: Message[];
  isWaitingForResponse?: boolean;
  className?: string;
  emptyState?: React.ReactNode;
}

export function ChatWindow({
  messages,
  isWaitingForResponse = false,
  className,
  emptyState,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaitingForResponse]);

  if (messages.length === 0 && !isWaitingForResponse) {
    return (
      <div className={cn("flex h-full w-full items-center justify-center", className)}>
        {emptyState ?? (
          <p className="text-sm text-muted-foreground">
            Start the conversation by sending a message.
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 overflow-y-auto md:px-40 lg:px-80 px-5 py-6",
        className
      )}
    >
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AssistantMessage key={message.id} message={message} />
        )
      )}

      <div ref={bottomRef} />
    </div>
  );
}