"use client";
import Sidebar from "@/components/Sidebar";
import { conversationType } from "@/lib/types";
import React, { useState } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<conversationType[]>([]);
  return (
    <div className="flex h-screen text-gray-100 bg-gray-900">
      <Sidebar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      {children}
    </div>
  );
}
