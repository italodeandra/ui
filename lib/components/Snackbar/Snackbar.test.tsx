import { act, render, screen, waitFor } from "@testing-library/react";
import { notify } from "./snackbar.state";
import Snackbar from "./Snackbar";
import user from "@testing-library/user-event";

describe("Snackbar", () => {
  test(`should render a snackbar when calling the "notify" API and close if after clicking the remove button`, async () => {
    render(<Snackbar />);

    const messageText = "This is a message";

    await act(async () => {
      notify(messageText);
    });

    const message = await screen.findByText(messageText);

    expect(message).toBeInTheDocument();

    const removeButton = screen.getByTestId("remove");

    user.click(removeButton);

    await waitFor(() => expect(message).not.toBeInTheDocument());
  });
});
