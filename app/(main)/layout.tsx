"use client";
import Sidebar from "@/components/Sidebar";
import ToggleSidebar from "@/components/ToggleSidebar";
import React, { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen text-gray-100 bg-gray-900">
      <div className="h-[40px] p-2 relative">
        {!sidebarOpen && (
          <ToggleSidebar toggleSideBar={() => setSidebarOpen(!sidebarOpen)} />
        )}
      </div>
      <Sidebar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      {children}
    </div>
  );
}
