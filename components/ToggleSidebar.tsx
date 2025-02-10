import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

export default function ToggleSidebar({
  toggleSideBar,
  isSidebarOpened = false,
}: {
  toggleSideBar: () => void;
  isSidebarOpened?: boolean;
}) {
  return (
    <button
      className="md:hidden  p-1.5 text-gray-200 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
      onClick={() => toggleSideBar()}
      aria-label="Toggle sidebar"
    >
      {isSidebarOpened ?<IoMdClose className="h-6 w-6" />:
        <FiMenu className="h-6 w-6" />
      }
      
    </button>
  );
}
