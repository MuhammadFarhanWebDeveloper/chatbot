import { FaRobot } from "react-icons/fa"

export default function HelloSection() {
  return (
    <div className="h-full w-full  flex justify-center items-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-lg max-w-md w-full transform transition-all duration-300 hover:scale-105 hover:bg-opacity-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-white text-6xl">
            <FaRobot />
          </div>
          <h1 className="text-3xl font-bold text-white text-center">Welcome to the Chatbot</h1>
          <p className="text-lg text-white text-center opacity-80">Created by Hafiz Muhammad Farhan</p>
        </div>
      </div>
    </div>
  )
}

