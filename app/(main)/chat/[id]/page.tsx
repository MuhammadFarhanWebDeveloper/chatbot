import Main from "@/components/Main";
import { getCollection } from "@/lib/connectToDB";
import { ObjectId } from "mongodb";
import React from "react";
type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id: conversationid } = await params;
  const collection = await getCollection("conversations");
  const conversation = await collection?.findOne({
    _id: new ObjectId(conversationid),
  });

  const messages = conversation?.messages || [];
  return <Main conversationId={conversationid} messages={messages} />;
}
