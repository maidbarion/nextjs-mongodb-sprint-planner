import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { CreateForm } from "./CreateForm";
import { createTicket } from "../actions/server";

const mockedCreateTicket = createTicket as jest.Mock;

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn().mockImplementation((path) => {
      window.location.pathname = path;
    }),
    refresh: jest.fn(),
  }),
}));

jest.mock("../actions/server", () => ({
  createTicket: jest.fn(),
}));

describe("CreateForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs correctly", () => {
    const { getByLabelText, getByText } = render(<CreateForm />);
    expect(getByLabelText("Title:")).toBeInTheDocument();
    expect(getByLabelText("Body:")).toBeInTheDocument();
    expect(getByLabelText("Email:")).toBeInTheDocument();
    expect(getByLabelText("Priority:")).toBeInTheDocument();
    expect(getByText("Add Ticket")).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const { getByText, getByLabelText } = render(<CreateForm />);
    const titleInput = getByLabelText("Title:");
    const bodyInput = getByLabelText("Body:");
    const emailInput = getByLabelText("Email:");
    const prioritySelect = getByLabelText("Priority:");
    const addButton = getByText("Add Ticket");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(prioritySelect, { target: { value: "medium" } });

    mockedCreateTicket.mockResolvedValueOnce({
      id: "123",
      title: "Test Title",
      body: "Test Body",
    });

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createTicket).toHaveBeenCalledTimes(1);
      expect(createTicket).toHaveBeenCalledWith({
        title: "Test Title",
        body: "Test Body",
        priority: "medium",
        user_email: "test@example.com",
      });
    });
  });

  test("does not submit form with invalid data", async () => {
    const { getByText } = render(<CreateForm />);
    const addButton = getByText("Add Ticket");

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(createTicket).not.toHaveBeenCalled();
    });
  });
});
