import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("submits the expected payload to the contact endpoint", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Sent." }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Contact Number/i), { target: { value: "+27821234567" } });
    fireEvent.change(screen.getByPlaceholderText(/^Subject$/i), { target: { value: "Job inquiry" } });
    fireEvent.change(screen.getByPlaceholderText(/Tell me about the AI/i), {
      target: { value: "I would like to discuss a role with you." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Send Inquiry/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: "Jane",
          last_name: "Doe",
          email: "jane@example.com",
          phone: "+27821234567",
          subject: "Job inquiry",
          message: "I would like to discuss a role with you.",
        }),
      });
    });

    expect(await screen.findByText(/Sent\./i)).toBeInTheDocument();
  });

  test("shows a validation error for invalid email before calling the backend", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByPlaceholderText(/Contact Number/i), { target: { value: "+27821234567" } });
    fireEvent.change(screen.getByPlaceholderText(/Tell me about the AI/i), {
      target: { value: "I would like to discuss a role with you." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Send Inquiry/i }));

    expect(await screen.findByText(/Please enter a valid contact email address\./i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
