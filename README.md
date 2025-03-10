# AI Chatbot App

A smart chatbot powered by Next.js, MongoDB, Gemini API, and Clerk. This app allows you to chat seamlessly, just like ChatGPT, with real-time AI responses. Your chat history is securely saved, so you can revisit past conversations anytime. Built with Clerk for authentication, ensuring a secure and personalized experience. 

## Key Features
- Real-time AI responses (Powered by Gemini API)
- Chat history saving (Access past conversations anytime)
- User authentication (Secure login with Clerk)
- MongoDB integration (Chat history storage)
- Streaming responses (Get instant, word-by-word replies)
## Installation
### Prerequisites
Ensure you have the following requirements:
- Node.js (>=18.x)
- MongoDB (local or cloud)
- Clerk API Key
- Gemini API Key
### Clone the Repository
```sh
git clone https://github.com/MuhammadFarhanWebDeveloper/chatbot.git
```

Create a `.env` file in the root directory of the project and configure your environment variables
```
MONGO_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
CLERK_SECRET_KEY=paste-your-clerk-secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=paste-your-clerk-publishable-key
GEMINI_API_KEY=paste-your-gemini-api-key
```
### Install Dependencies
```sh
npm install
```
### Run the Development Server:

```sh
npm run dev
```

Open http://localhost:3000 to see the app in action.
