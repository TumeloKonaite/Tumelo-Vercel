import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AssistantPanel from "./AssistantPanel";

jest.mock("react-markdown", () => ({ children }) => <div>{children}</div>);
jest.mock("remark-gfm", () => () => null);

const jsonResponse = (data, ok = true) => ({
  ok,
  json: jest.fn().mockResolvedValue(data),
});

const feedbackResponse = (rating, comment = null) =>
  jsonResponse({
    id: "feedback-1",
    message_id: "message-1",
    rating,
    comment,
    created_at: "2026-07-15T10:00:00Z",
    updated_at: "2026-07-15T10:00:00Z",
  });

async function renderAssistantResponse() {
  window.fetch.mockResolvedValueOnce(
    jsonResponse({
      reply: "A useful answer",
      conversation_id: "conversation-1",
      message_id: "message-1",
    })
  );

  render(<AssistantPanel showPromptSuggestions={false} />);
  fireEvent.change(screen.getByLabelText("Assistant message input"), {
    target: { value: "Tell me more" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send message" }));

  await screen.findByText("A useful answer");
}

describe("AssistantPanel feedback", () => {
  beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    window.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("submits thumbs-up feedback and disables controls while saving", async () => {
    await renderAssistantResponse();

    let resolveFeedback;
    window.fetch.mockImplementationOnce(
      () => new Promise((resolve) => {
        resolveFeedback = resolve;
      })
    );

    const thumbsUp = screen.getByRole("button", { name: "Thumbs up" });
    const thumbsDown = screen.getByRole("button", { name: "Thumbs down" });
    fireEvent.click(thumbsUp);

    expect(thumbsUp).toBeDisabled();
    expect(thumbsDown).toBeDisabled();
    expect(screen.getByText("Saving...")).toBeInTheDocument();

    resolveFeedback(feedbackResponse("up"));

    await screen.findByText("Feedback saved");
    expect(thumbsUp).toHaveAttribute("aria-pressed", "true");
    expect(window.fetch).toHaveBeenLastCalledWith(
      "/api/chat/messages/message-1/feedback",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ rating: "up", comment: null }),
      })
    );
  });

  test("submits thumbs-down feedback with an optional comment", async () => {
    await renderAssistantResponse();
    window.fetch.mockResolvedValueOnce(
      feedbackResponse("down", "Include a concrete example")
    );

    fireEvent.click(screen.getByRole("button", { name: "Thumbs down" }));
    const comment = screen.getByLabelText(/How could this answer be improved/i);
    fireEvent.change(comment, { target: { value: "Include a concrete example" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit feedback" }));

    await screen.findByText("Feedback saved");
    expect(window.fetch).toHaveBeenLastCalledWith(
      "/api/chat/messages/message-1/feedback",
      expect.objectContaining({
        body: JSON.stringify({
          rating: "down",
          comment: "Include a concrete example",
        }),
      })
    );
    expect(screen.queryByLabelText(/How could this answer be improved/i)).not.toBeInTheDocument();
  });

  test("allows changing an existing rating", async () => {
    await renderAssistantResponse();
    window.fetch.mockResolvedValueOnce(feedbackResponse("up"));

    fireEvent.click(screen.getByRole("button", { name: "Thumbs up" }));
    await screen.findByText("Feedback saved");

    fireEvent.click(screen.getByRole("button", { name: "Thumbs down" }));
    expect(screen.getByLabelText(/How could this answer be improved/i)).toBeInTheDocument();

    window.fetch.mockResolvedValueOnce(feedbackResponse("down"));
    fireEvent.click(screen.getByRole("button", { name: "Skip" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Thumbs down" })).toHaveAttribute(
        "aria-pressed",
        "true"
      )
    );
    expect(window.fetch).toHaveBeenCalledTimes(3);
  });

  test("shows an API error and retries the same feedback", async () => {
    await renderAssistantResponse();
    window.fetch.mockResolvedValueOnce(
      jsonResponse({ error: "Feedback service is unavailable." }, false)
    );

    fireEvent.click(screen.getByRole("button", { name: "Thumbs up" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Feedback service is unavailable."
    );

    window.fetch.mockResolvedValueOnce(feedbackResponse("up"));
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));

    await screen.findByText("Feedback saved");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalledTimes(3);
  });
});
