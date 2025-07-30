import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import FormInput from "./FormInput";

describe.each([
  { inputType: "text", value: "Sample Value" },
  { inputType: "email", value: "user@test.com" },
  { inputType: "password", value: "password123" },
  { inputType: "date", value: "2023-10-01" },
  { inputType: "number", value: "1" },
])("FormInput with type $inputType", ({ inputType, value }) => {
  it(`renders input of type ${inputType} and of value ${value}`, () => {
    render(
      <FormInput
        label="Test Input"
        inputId="test"
        type={inputType}
        value={value}
        onChange={() => {}}
      />
    );
    const input = screen.getByLabelText("Test Input") as HTMLInputElement;
    expect(input.type).toBe(inputType);
    expect(input.value).toBe(value);
  });
});

describe("FormInput", () => {
  it("renders input with label", () => {
    render(
      <FormInput
        label="Test Input"
        inputId="test"
        value="test"
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Test Input")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("test");
  });

  it("calls onChange handler on input change", () => {
    const handleChange = vi.fn();
    render(
      <FormInput
        label="Test Input"
        inputId="test"
        value=""
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText("Test Input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "new value" } });
    input.value = "new value";
    input.dispatchEvent(new Event("input"));
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("renders with error message", () => {
    render(
      <FormInput
        label="Test Input"
        inputId="test"
        value=""
        errorMsg="This field is required"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
