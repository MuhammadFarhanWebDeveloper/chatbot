"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
