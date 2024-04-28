import { createTicket, getTicket, getTicketIds, getTickets } from "./server";
import { connectToDatabase } from "../database/mongodb";

const mockedConnectToDatabase = connectToDatabase as jest.Mock;

beforeEach(() => {
  mockedConnectToDatabase.mockClear();
});

jest.mock("../database/mongodb", () => ({
  connectToDatabase: jest.fn(),
}));

describe("getTicketIds", () => {
  it("should return an array of ticket IDs", async () => {
    mockedConnectToDatabase.mockResolvedValueOnce({
      collection: jest.fn().mockReturnThis(),
      aggregate: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValueOnce([{ _id: "1" }, { _id: "2" }]),
    });
    const result = await getTicketIds();
    expect(result).toEqual(["1", "2"]);
    expect(connectToDatabase).toHaveBeenCalled();
  });

  it("should throw an error if an error has occured", async () => {
    mockedConnectToDatabase.mockRejectedValueOnce(
      new Error("Database connection error")
    );
    await expect(getTicketIds()).rejects.toThrow("Database connection error");
  });
});

describe("getTickets", () => {
  it("should return an array of ticket IDs with titles", async () => {
    mockedConnectToDatabase.mockResolvedValueOnce({
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      toArray: jest.fn().mockResolvedValueOnce([
        { id: 1, title: "Ticket 1" },
        { id: 2, title: "Ticket 2" },
      ]),
    });
    const result = await getTickets();
    expect(result).toEqual([
      { id: 1, title: "Ticket 1" },
      { id: 2, title: "Ticket 2" },
    ]);
    expect(connectToDatabase).toHaveBeenCalled();
  });

  it("should throw an error if an error has occured", async () => {
    mockedConnectToDatabase.mockRejectedValueOnce(
      new Error("Database connection error")
    );
    await expect(getTickets()).rejects.toThrow("Database connection error");
  });
});

describe("getTicket", () => {
  it("should return details of a single ticket", async () => {
    const mockTicket = {
      _id: "9B03C7098931309DC768066C",
      title: "Mock Ticket",
      body: "Mock Ticket Body",
      priority: "High",
      user_email: "test@example.com",
    };

    mockedConnectToDatabase.mockResolvedValueOnce({
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockResolvedValueOnce(mockTicket),
    });

    const result = await getTicket("9B03C7098931309DC768066C");

    expect(result).toEqual(mockTicket);
    expect(connectToDatabase).toHaveBeenCalled();
  });

  it("should throw an error if an error has occured", async () => {
    mockedConnectToDatabase.mockRejectedValueOnce(
      new Error("Database connection error")
    );
    await expect(getTicket("invalid data")).rejects.toThrow(
      "Database connection error"
    );
  });
});

describe("createTicket", () => {
  it("should create a ticket and return true", async () => {
    const mockTicketData = {
      title: "Mock Ticket",
      body: "Mock Ticket Body",
      priority: "High",
      user_email: "test@example.com",
    };

    const dbClient = {
      collection: jest.fn().mockReturnThis(),
      insertOne: jest.fn().mockResolvedValueOnce({}),
    };
    mockedConnectToDatabase.mockResolvedValueOnce(dbClient);

    const result = await createTicket(mockTicketData);

    expect(result).toBe(true);
    expect(connectToDatabase).toHaveBeenCalled();
    expect(dbClient.insertOne).toHaveBeenCalledWith(mockTicketData);
  });
});
