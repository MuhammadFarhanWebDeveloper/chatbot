"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { conversationType } from "./types";

interface ConversationsContextType {
  conversations: conversationType[];
  setConversations: (conversations: conversationType[]) => void;
}

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

interface ConversationsProviderProps {
  initialConversations: conversationType[];
  children: ReactNode;
}

export const ConversationsProvider = ({
  initialConversations,
  children,
}: ConversationsProviderProps) => {
  const [conversations, setConversations] =
    useState<conversationType[]>(initialConversations);

  return (
    <ConversationsContext.Provider value={{ conversations, setConversations }}>
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = (): ConversationsContextType => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider"
    );
  }
  return context;
};
