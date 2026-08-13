"use client"

import BeforeChatBg from "@/components/before-chat-bg";
import { ChatWindow } from "@/components/chat-window";
import InputText from "@/components/input-text";
import TopBar from "@/components/top-bar";
import { Ripple } from "@/components/ui/ripple";
import type { Message } from "@/types/chat";
import { useState } from "react";

// Shape the backend's streamMohanAnswer expects for prior turns.
type HistoryMessage = { role: "user" | "assistant"; content: string };

function buildHistory(messages: Message[]): HistoryMessage[] {
  // Only send completed, successful turns — skip anything mid-stream,
  // empty, or errored so the LLM doesn't get confused by partial context.
  return messages
    .filter((m) => m.content.trim() && m.status !== "error" && !m.isStreaming)
    .map((m) => ({ role: m.role, content: m.content }));
}

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")

  const submitQuery = async () => {
    if (!query.trim()) return;
    const content = query;
    setQuery("");
    await sendMessage(content);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessageContent = (id: string, chunk: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: m.content + chunk } : m))
    );
  };

  const finishStreaming = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isStreaming: false } : m))
    );
  };

  const sendMessage = async (content: string) => {
    const history = buildHistory(messages);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: Date.now(),
      status: "sent",
    };
    addMessage(userMessage);
    setLoading(true);

    const assistantId = crypto.randomUUID();
    addMessage({
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
      isStreaming: true,
    });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error ?? `Request failed with status ${res.status}`);
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        updateMessageContent(assistantId, chunk);
      }

      finishStreaming(assistantId);
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, isStreaming: false, status: "error" }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <TopBar />
      <Ripple className="fixed" />
      {messages.length === 0 && <BeforeChatBg />}

      {messages.length > 0 && <div className="w-full h-[80vh] md:h-[74vh] mt-12 md:mt-20 mb-20 md:mb-30 overflow-x-hidden overflow-y-scroll">
        <ChatWindow messages={messages} isWaitingForResponse={loading} />
      </div>}

      <InputText
        submitQuery={submitQuery}
        loading={loading}
        query={query}
        setQuery={setQuery}
        messagesSize={messages.length} />
    </div>
  );
}