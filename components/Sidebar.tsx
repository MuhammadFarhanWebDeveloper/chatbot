import React from "react";
import {  FiPlus } from "react-icons/fi";
import ToggleSidebar from "./ToggleSidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useConversations } from "@/lib/ConversationsContext";
import { useRouter } from "next/navigation";

export default function Sidebar({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const router = useRouter()
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default Link behavior
    router.refresh(); // Force re-render of the home page
  };
  const { conversations } = useConversations();
  return (
    <div
      className={`bg-gray-800 text-white w-72 z-20 flex flex-col space-y-4 py-5 px-3 absolute inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-300 ease-in-out shadow-lg`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-semibold text-gray-200">HMF</h2>
        <ToggleSidebar toggleSideBar={toggleSidebar} isSidebarOpened={sidebarOpen} />
      </div>

      {/* New Chat Button */}
      <button
  className="flex items-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition w-full"
  onClick={() => router.push("/")}
>
  <FiPlus className="h-5 w-5" />
  <span className="text-gray-200">New Chat</span>
</button>

      {/* Chat History Section */}
      <nav className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
        {/* Example chat history */}
        {conversations.map((item, index) => (
          <Link
            key={index}
            href={`/chat/${item._id}`}
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg w-full text-left truncate"
          >
            {item.title.length > 25
              ? item.title.slice(0, 25) + "..."
              : item.title}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-3 flex justify-center">
        <SignedIn>
          <UserButton appearance={{ elements: { avatarBox: "scale-125" } }} />
        </SignedIn>
      </div>
    </div>
  );
}
