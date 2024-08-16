import type { APIRoute } from "astro";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

const openai = createOpenAI({
  apiKey: import.meta.env.OPEN_AI_KEY,
});

// How long to allow streaming responses from the AI.
export const maxDuration = 30;

export const POST: APIRoute = async ({ params, request }) => {
  //   console.log(params);

  const { messages } = await request.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
};
