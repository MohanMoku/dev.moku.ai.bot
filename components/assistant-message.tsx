import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Message } from "@/types/chat";
import { useState } from "react";
import { CircleCheck, Copy } from "lucide-react";

interface AssistantMessageProps {
  message: Message;
  className?: string;
}

export function AssistantMessage({ message, className }: AssistantMessageProps) {

  const [copied, setCopied] = useState<boolean>(false);

  const makeCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex w-full justify-start", className)}>
      <div className="flex max-w-[80%] flex-col items-start gap-1">
        <div className="rounded bg-black/90 px-4 py-2.5 text-lg text-white leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;

                if (isInline) {
                  return (
                    <code
                      className="rounded bg-gray-600 px-1 py-0.5 text-lg"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "0.5rem",
                      fontSize: "1rem",
                      margin: 0,
                    }}
                  >
                    {String(children).replace(/\n$/, "").replace(/<th>/g, '<th class="text-white">')}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {message.isStreaming && (
          <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-foreground/60 align-middle" />
        )}

        {message.status === "error" && (
          <span className="text-xs text-destructive">Failed to generate response</span>
        )}
        {copied ? <CircleCheck size={20} /> : <Copy size={20} className="cursor-pointer" onClick={makeCopy} />}
      </div>
    </div>
  );
}