
import { NextRequest } from "next/server";
import { streamMohanAnswer, type ChatMessage } from "./mohanRag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const userMessage: string = body?.message ?? "";
  const history: ChatMessage[] = Array.isArray(body?.history)
    ? body.history
    : [];

  if (!userMessage.trim()) {
    return new Response(
      JSON.stringify({ error: "Message content is required." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const token of streamMohanAnswer(
          userMessage,
          history,
          req.signal
        )) {
          if (req.signal.aborted) {
            console.log("Mohan stream: client disconnected");
            return;
          }

          controller.enqueue(encoder.encode(token));
        }
      } catch (err) {
        if (req.signal.aborted) {
          console.log("Mohan stream: request aborted");
          return;
        }

        console.error("mohan-chat stream error:", err);

        try {
          controller.enqueue(
            encoder.encode(
              "\n\nSomething went wrong generating a response. Please try again."
            )
          );
        } catch {
        }
      } finally {
        if (!req.signal.aborted) {
          try {
            controller.close();
          } catch {
          }
        }
      }
    },

    cancel() {
      console.log("Mohan stream cancelled");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
