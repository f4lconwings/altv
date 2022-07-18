import { MongoClient } from "mongodb";
import { print } from "~/lib/cli";
import { environment } from "~/lib/env";

export async function connectToDatabase() {
  if (!environment.DATABASE) throw new Error("Database not set in .env");
  const Client = await MongoClient.connect(environment.DATABASE).catch((e) => {
    throw e;
  });

  global.dbClient = Client;
  global.db = Client.db("f4");
  print("Database connection established");

  return true;
}
