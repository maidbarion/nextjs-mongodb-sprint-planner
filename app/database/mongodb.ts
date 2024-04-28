import { Db, MongoClient, ServerApiVersion } from "mongodb";

let dbClient: Db;

export const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("environment variable MONGODB_URI is not defined");
  }

  if (dbClient) {
    return dbClient;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const db = await client.db("sprintPlanner");
  dbClient = db;

  return db;
};
