"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { FiSend } from "react-icons/fi";
import ToggleSidebar from "./ToggleSidebar";
import type { messageType } from "@/lib/types";
import HelloSection from "./HelloSection";
import MarkdownRenderer from "./MarkdownRenderer";
import { addChat } from "@/lib/action";
import { useConversations } from "@/lib/ConversationsContext";

export default function Main({
  conversationId: conversationIdProp = null,
  messages: initialMessages = [],
}: {
  conversationId?: null | string;
  messages?: messageType[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<messageType[]>(initialMessages);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [conversationId, setConversationId] = useState(conversationIdProp);
  const { setConversations, conversations } = useConversations();
  const insertMessage = useCallback(
    async (formData: FormData) => {
      if (conversationId) {
        formData.append("conversationsid", conversationId);
      }
      const response = await addChat(formData);
      setConversationId(response?._id ?? null);
      if (response?._id) {
        setConversations([
          ...conversations,
          { _id: response._id, title: response.title },
        ]);
      }
    },
    [conversationId, conversations, setConversations]
  );

  useEffect(() => {
    if (isStreaming && typingIndex < currentResponse.length) {
      const timer = setTimeout(() => {
        setDisplayedResponse(currentResponse.slice(0, typingIndex + 5));
        setTypingIndex((prev) => prev + 5);
      }, 0);

      return () => clearTimeout(timer);
    } else if (!isStreaming && currentResponse) {
      const latestMessage = {
        request: messages[messages.length - 1].request,
        response: currentResponse,
      };
      setMessages((prev) => [...prev.slice(0, -1), latestMessage]);
      setCurrentResponse("");
      setDisplayedResponse("");
      setTypingIndex(0);

      const formData = new FormData();
      formData.append("message", JSON.stringify(latestMessage));

      insertMessage(formData);
    }
  }, [isStreaming, currentResponse, typingIndex, insertMessage, messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = inputRef.current?.value.trim();
    if (!prompt || isStreaming) return;

    const userMessage: messageType = { request: prompt, response: "" };
    setMessages((prev) => [...prev, userMessage]);
    inputRef.current!.value = "";

    try {
      setIsStreaming(true);
      setResponseError(null);
      setCurrentResponse("");
      setDisplayedResponse("");
      setTypingIndex(0);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, history: messages }),
      });

      if (!response.body || !response.ok) {
        const tojson = await response.json();
        return setResponseError(tojson.error || "Sorry, something went wrong");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setCurrentResponse((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
  
      {messages.length ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom">
          {messages.map((message, index) => (
            <div className="flex flex-col gap-4" key={index}>
              <div className="flex items-start space-x-4 justify-end">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  U
                </div>
                <div className="p-3 rounded-lg max-w-[80%] bg-blue-600 text-white">
                  <p className="whitespace-pre-wrap">{message.request}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 text-gray-100 flex items-center justify-center">
                  AI
                </div>
                <div className="p-3 rounded-lg max-w-[80%] bg-gray-700 text-gray-100">
                  <div className="whitespace-pre-wrap">
                    {index === messages.length - 1 && isStreaming ? (
                      <MarkdownRenderer content={displayedResponse} />
                    ) : (
                      <MarkdownRenderer content={message.response} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {responseError && (
            <p className="text-center font-bold text-lg text-red-700">
              {responseError}
            </p>
          )}
        </div>
      ) : (
        <HelloSection />
      )}
      <div className="p-4 bg-gray-800">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            ref={inputRef}
            disabled={isStreaming}
            type="text"
            name="prompt"
            placeholder="Type your message here..."
            className="flex-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isStreaming}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <FiSend className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
