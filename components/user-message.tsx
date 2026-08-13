import { cn } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { CircleCheck, Copy } from "lucide-react";
import { useState } from "react";

interface UserMessageProps {
  message: Message;
  className?: string;
}

export function UserMessage({ message, className }: UserMessageProps) {

  const [copied, setCopied] = useState<boolean>(false);

  const makeCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex w-full justify-end", className)}>
      <div className="flex max-w-[75%] flex-col items-end gap-1">
        <div className="bg-white/5 px-4 text-white py-2.5 rounded">
          <p className="whitespace-pre-wrap wrap-break-words text-xl">{message.content}</p>
        </div>

        {message.status === "error" && (
          <span className="text-xs text-destructive">Failed to send</span>
        )}
        {copied ? <CircleCheck size={20} /> : <Copy size={20} className="cursor-pointer" onClick={makeCopy} />}
      </div>
    </div>
  );
}