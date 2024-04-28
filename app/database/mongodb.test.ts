import { connectToDatabase } from "./mongodb";

describe("MongoDB Connection", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.MONGO_URI = "mongodb://localhost:27017/test";
  });

  afterEach(async () => {
    const { dbClient } = require("./mongodb");
    if (dbClient) {
      await dbClient.close();
    }
  });

  it("should connect to the database successfully", async () => {
    const db = await connectToDatabase();
    expect(db).toBeDefined();
  });

  it("should throw an error if MONGODB_URI environment variable is not defined", async () => {
    delete process.env.MONGO_URI;
    await expect(connectToDatabase()).rejects.toThrow(
      "environment variable MONGODB_URI is not defined"
    );
  });
});
