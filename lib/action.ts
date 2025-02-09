"use server";

import { auth } from "@clerk/nextjs/server";
import { getCollection } from "./connectToDB";
import { ObjectId } from "mongodb";
import { generateTitle } from "./generateTitle";
export const addChat = async (formData: FormData) => {
  try {
    const conversationsid = formData.get("conversationsid");
    const stringMessage = formData.get("message");
    let message;
    if (stringMessage) {
      message = JSON.parse(stringMessage as string);
    }
    const userid = (await auth()).userId as string;

    const collection = await getCollection("conversations");
    if (!conversationsid) {
      const title = await generateTitle(message.request);
      const newConversation = await collection?.insertOne({
        title,
        userid,
        messages: [message],
      });
      console.log(newConversation?.insertedId.toString());
      return { _id: newConversation?.insertedId.toString(), title };
    }
    const updatesConversation = await collection?.updateOne(
      { _id: new ObjectId(conversationsid as string) },
      { $push: { messages: message } }
    );
    console.log(updatesConversation);

    const chats = collection?.find({
      conversationsid: conversationsid,
      userid: userid,
    });

    console.log(chats);
  } catch (error) {
    console.log(error);
  }
};




