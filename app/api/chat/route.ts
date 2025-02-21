import { messageType } from "@/lib/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "edge";
const prepareContext = (history: messageType[]): string => {
  return history
    .map((msg) => `User: ${msg.request}\n${msg.response}`)
    .join("\n");
};


export async function POST(req: Request) {
  try {
    const { prompt, history }: { prompt: string; history: messageType[] } =
      await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are an AI chatbot developed by Full Stack Developer Hafiz Muhammad Farhan using the Gemini API. Hafiz Muhammad Farhan is a full-stack developer from Khyber Pakhtunkhwa, Pakistan. He specializes in creating dynamic, responsive web applications using Next.js and React.js, with expertise in CSS and Tailwind CSS for crafting modern, user-friendly interfaces. His JavaScript skills extend from building interactive front-end components to managing complex backend logic with Node.js and Express.js, enabling him to deliver high-quality, scalable solutions that prioritize user experience and functionality.",
    });

    const context = prepareContext(history);
    const stream = await model.generateContentStream(
      `${context}\nUser: ${prompt}\n`
    );

    if (!stream?.stream) throw new Error("Failed to generate AI response");

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream.stream) {
            controller.enqueue(encoder.encode(chunk.text()));
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error("Error streaming AI response");
        }
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
