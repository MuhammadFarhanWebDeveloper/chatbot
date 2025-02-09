import Main from "@/components/Main";
import { getCollection } from "@/lib/connectToDB";
import { ObjectId } from "mongodb";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const conversationsid = await params.id;
  const collection = await getCollection("conversations");
  const conversation = await collection?.findOne({
    _id: new ObjectId(conversationsid),
  });


  const messages = conversation?.messages || [];
  return <Main conversationId={conversationsid} messages={messages} />;
}
