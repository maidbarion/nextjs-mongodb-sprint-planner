import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CloseButton } from "./CloseButton";

describe("Button Component", () => {
  it("renders the button correctly", () => {
    const { getByText } = render(
      <CloseButton ticketId="123" callback={() => {}} />
    );
    const closeButton = getByText("×");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls callback function with ticketId when clicked", () => {
    const mockCallback = jest.fn();
    const ticketId = "123";
    const { getByText } = render(
      <CloseButton ticketId={ticketId} callback={mockCallback} />
    );
    const closeButton = getByText("×");
    fireEvent.click(closeButton);
    expect(mockCallback).toHaveBeenCalledWith(ticketId);
  });
});
