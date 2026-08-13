export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isStreaming?: boolean;   // true while tokens are still arriving
  status?: "sending" | "sent" | "error";
}