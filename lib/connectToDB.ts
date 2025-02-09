import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in .env file");
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName: string) {
  try {
    await client.connect();
    console.log("<===Connected to MongoDB===>");
    return client.db(dbName);
  } catch (error) {
    console.log(error);
  }
}

export const getCollection = async (collectionName: string) => {
  const db = await getDB("Chatbot");
  if (db) {
    return db.collection(collectionName);
  }
  return null;
};
