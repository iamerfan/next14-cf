import { MongoClient } from "mongodb";
const { MONGODB_URI, MONGODB_Db } = process.env;

export async function ConnectToDatabase() {
  const client = new MongoClient(MONGODB_URI);
  return {
    client,
    connect: async () => await client.connect(),
    close: async () => await client.close(),
    db: client.db(MONGODB_Db),
  };
}

export function Res(message, status, statusText) {
  return new Response(message && JSON.stringify(message), {
    status: status ? status : 200,
    statusText,
  });
}
