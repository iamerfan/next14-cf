import { ConnectToDatabase, Res } from "@/config/db";

export async function GET() {
  const { connect, close, db } = await ConnectToDatabase();
  await connect();
  const items = db.collection("items");
  try {
    const res = await items.find({}).toArray();
    return Res(res);
  } catch (error) {
    throw error;
  } finally {
    await close();
  }
}
