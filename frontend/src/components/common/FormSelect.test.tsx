import { render, screen } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FormSelect from "./FormSelect";

describe("FormSelect", () => {
  it("renders select with initial value", () => {
    render(
      <FormSelect
        label="Test"
        inputId="test-select"
        listItems={[
          { id: 1, name: "Option 1" },
          { id: 2, name: "Option 2" },
        ]}
        value=""
        onChange={() => {}}
      />
    );
    const select = screen.getByLabelText("Test") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("");
    expect(select).toHaveDisplayValue("-- Select Test --");
  });

  it("renders correct option when selection changes", async () => {
    const Wrapper = () => {
      const [val, setVal] = useState("");
      return (
        <FormSelect
          label="Test"
          inputId="test-select"
          listItems={[
            { id: 1, name: "Option 1" },
            { id: 2, name: "Option 2" },
          ]}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
      );
    };

    const user = userEvent.setup();
    render(<Wrapper />);

    const select = screen.getByLabelText("Test") as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("");
    expect(select).toHaveDisplayValue("-- Select Test --");
    // Change Selection to Option 2
    await user.selectOptions(select, "2");
    expect(select).toHaveValue("2");
    expect(
      (screen.getByText("-- Select Test --") as HTMLOptionElement).selected
    ).toBe(false);
    expect((screen.getByText("Option 1") as HTMLOptionElement).selected).toBe(
      false
    );
    expect((screen.getByText("Option 2") as HTMLOptionElement).selected).toBe(
      true
    );
  });

  it("renders with error message", () => {
    render(
      <FormSelect
        label="Test Input"
        inputId="test"
        listItems={[
          { id: 1, name: "Option 1" },
          { id: 2, name: "Option 2" },
        ]}
        value=""
        errorMsg="Category is required"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Category is required")).toBeInTheDocument();
  });
});
