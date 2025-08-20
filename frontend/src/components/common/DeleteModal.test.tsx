import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DeleteModal from "./DeleteModal";

describe("DeleteModal", () => {
  it("renders modal if open", () => {
    const deleteFn = vi.fn();
    const closeFn = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        onClose={closeFn}
        onDelete={deleteFn}
        itemId={1}
      />
    );
    const deleteModal = screen.getByRole("dialog", { name: /are you sure/i });
    expect(deleteModal).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i }));
    expect(screen.getByRole("button", { name: /cancel/i }));
  });

  it("does not render if not open", () => {
    const deleteFn = vi.fn();
    const closeFn = vi.fn();
    render(
      <DeleteModal
        isOpen={false}
        onClose={closeFn}
        onDelete={deleteFn}
        itemId={1}
      />
    );
    expect(
      screen.queryByRole("dialog", { name: /are you sure/i })
    ).not.toBeInTheDocument();
  });

  it("calls delete callback function when delete button is clicked", async () => {
    const user = userEvent.setup();
    const deleteFn = vi.fn();
    const closeFn = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        onClose={closeFn}
        onDelete={deleteFn}
        itemId={1}
      />
    );
    await user.click(screen.getByText("Delete"));
    expect(deleteFn).toHaveBeenCalled();
  });

  it("calls close callback function when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const deleteFn = vi.fn();
    const closeFn = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        onClose={closeFn}
        onDelete={deleteFn}
        itemId={1}
      />
    );
    await user.click(screen.getByText("Cancel"));
    expect(closeFn).toHaveBeenCalled();
  });
});
