import { MongoClient } from "mongodb";
import { dbUrl } from "../config";
import { print } from "../lib/cli";

export const connectToDatabase = MongoClient.connect(dbUrl).then((client) => {
  global.dbClient = client;
  global.db = client.db("dev");
  print("Database connection established");
});
