import { TicketDetails, generateStaticParams } from "./page";
import { getTicketIds, getTicket } from "../actions/server";
import { render } from "@testing-library/react";

const mockedGetTicket = getTicket as jest.Mock;
const mockedGetTicketIds = getTicketIds as jest.Mock;

jest.mock("next/navigation");
jest.mock("../actions/server");

describe("TicketDetails component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ticket details correctly", async () => {
    const mockTicket = {
      id: "123",
      title: "Mock Ticket",
      user_email: "user@example.com",
      body: "Mock ticket body",
      priority: "high",
    };
    mockedGetTicket.mockResolvedValue(mockTicket);

    const Resolved = await TicketDetails({ params: { id: "123" } });
    const { container } = render(Resolved);

    expect(container).toHaveTextContent("Ticket Details");
    expect(container).toHaveTextContent("Mock Ticket");
    expect(container).toHaveTextContent("Created by user@example.com");
    expect(container).toHaveTextContent("Mock ticket body");
    expect(container.querySelector(".pill.high")).toBeInTheDocument();
  });
});

describe("generateStaticParams function", () => {
  it("generates static params correctly", async () => {
    const mockTicketIds = ["123", "456", "789"];
    mockedGetTicketIds.mockResolvedValue(mockTicketIds);
    const staticParams = await generateStaticParams();

    expect(staticParams).toEqual([{ id: "123" }, { id: "456" }, { id: "789" }]);
  });
});
