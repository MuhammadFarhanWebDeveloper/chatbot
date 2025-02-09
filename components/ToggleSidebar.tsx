import React from "react";
import { FiMenu } from "react-icons/fi";

export default function ToggleSidebar({
  toggleSideBar,
}: {
  toggleSideBar: () => void;
}) {
  return (
    <button
      className="md:hidden  p-1.5  text-gray-200 rounded-full shadow-lg hover:bg-gray-700 bg-gray-900  transition-all duration-300 ease-in-out transform hover:scale-110"
      onClick={() => toggleSideBar()}
      aria-label="Toggle sidebar"
    >
      <FiMenu className="h-6 w-6" />
    </button>
  );
}
