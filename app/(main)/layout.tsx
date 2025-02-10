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
    <div className="flex pt-14 h-screen text-gray-100 relative bg-gray-900">
      <div className=" fixed top-0 pl-2 pt-2 left-0 z-10 right-0 bg-gray-800">
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
