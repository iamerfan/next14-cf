import { MongoClient } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_Db = process.env.MONGODB_Db;

let cachedClient = null;
let cachedDb = null;

export async function ConnectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Connected to database using cache");
    return {
      connect: async () => {},
      client: cachedClient,
      db: cachedDb,
      close: async () => {},
    };
  }

  const client = new MongoClient(MONGODB_URI);

  const connect = async () => {
    if (!cachedClient) {
      const startTime = new Date().getTime();
      await client.connect();
      cachedClient = client;
      cachedDb = client.db(MONGODB_Db);
      const endTime = new Date().getTime();
      const connectedTime = endTime - startTime;
      console.log(`Connected to database (${connectedTime} ms)`);
    }
  };

  const close = async () => {
    if (cachedClient) {
      await cachedClient.close();
      cachedClient = null;
      cachedDb = null;
      console.log("Disconnected from database");
    }
  };

  await connect();

  return { connect, client, db: cachedDb, close };
}

export function Res(message, status, statusText) {
  return new Response(message && JSON.stringify(message), {
    status: status ? status : 200,
    statusText,
  });
}
