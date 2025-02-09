import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConversationsProvider } from "@/lib/ConversationsContext";
import { auth } from "@clerk/nextjs/server";
import { getCollection } from "@/lib/connectToDB";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatbot by H_M_Farhan",
  description: "This is chatbot developed using next.js & google gemini by Hafiz Muhammad Farhan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userid = (await auth()).userId as string;
  const collection = await getCollection("conversations");
  const conversations =
    (await collection?.find({ userid }).toArray())?.map((doc) => ({
      title: doc.title,
      userid: doc.userid,
      _id: doc._id.toString(),
    })) || [];
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
        >
          <ConversationsProvider initialConversations={conversations}>
            {children}
          </ConversationsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
