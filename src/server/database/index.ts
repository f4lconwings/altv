import { MongoClient } from "mongodb";
import { alert, print } from "~/lib/cli";

export async function connectToDatabase() {
  if (!process.env.DB) throw alert("Database not found in .env");
  const Client = await MongoClient.connect(process.env.DB);

  global.dbClient = Client;
  global.db = Client.db("dev");
  print("Database connection established");

  return true;
}
