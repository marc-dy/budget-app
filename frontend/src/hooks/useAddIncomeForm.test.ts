import { renderHook, act } from "@testing-library/react";
import { toast } from "react-hot-toast";
import { vi } from "vitest";
import { useAddIncomeForm } from "./useAddIncomeForm";

describe("useAddIncomeForm", () => {
  const mockClose = vi.fn();
  beforeEach(() => {
    vi.stubEnv("DEV", false);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("updates input form value on handleChange", () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "receivedFrom", value: "Company X" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.incomeFormValues.receivedFrom).toBe("Company X");
  });

  it("updates select form value on handleChange", () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "category", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });
    expect(result.current.incomeFormValues.category).toBe("2");
  });

  it("updates textarea form value on handleChange", () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "comment", value: "This is a comment" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });
    expect(result.current.incomeFormValues.comment).toBe("This is a comment");
  });

  it("returns errors on empty fields", async () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });
    expect(result.current.errors.receivedFrom?.length).toBeGreaterThan(0);
    expect(result.current.errors.amount?.length).toBeGreaterThan(0);
    expect(result.current.errors.category?.length).toBeGreaterThan(0);
    expect(result.current.errors.account?.length).toBeGreaterThan(0);
    expect(result.current.errors.date?.length).toBeGreaterThan(0);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns error if amount is negative", async () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "receivedFrom", value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "amount", value: "-1" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "category", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "account", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "date", value: "01/01/2020" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });
    expect(result.current.errors.receivedFrom).not.toBeDefined();
    expect(result.current.errors.amount).toContain("must be a valid number");
    expect(result.current.errors.category).not.toBeDefined();
    expect(result.current.errors.account).not.toBeDefined();
    expect(result.current.errors.date).not.toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns error if amount is not a number", async () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "receivedFrom", value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "amount", value: "abcdefg" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "category", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "account", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "date", value: "01/01/2020" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });
    expect(result.current.errors.receivedFrom).not.toBeDefined();
    expect(result.current.errors.amount).toContain("must be a valid number");
    expect(result.current.errors.category).not.toBeDefined();
    expect(result.current.errors.account).not.toBeDefined();
    expect(result.current.errors.date).not.toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns error if date is invalid", async () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "receivedFrom", value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "amount", value: "1000.00" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "category", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "account", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "date", value: "abcdefg" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });
    expect(result.current.errors.receivedFrom).not.toBeDefined();
    expect(result.current.errors.amount).not.toBeDefined();
    expect(result.current.errors.category).not.toBeDefined();
    expect(result.current.errors.account).not.toBeDefined();
    expect(result.current.errors.date).toContain("valid date");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("sends a post request on submit", async () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "receivedFrom", value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "amount", value: "1000.00" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "category", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "account", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "date", value: "01/01/2020" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
    });
    global.fetch = mockFetch;
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });
    expect(result.current.errors.receivedFrom).not.toBeDefined();
    expect(result.current.errors.amount).not.toBeDefined();
    expect(result.current.errors.category).not.toBeDefined();
    expect(result.current.errors.account).not.toBeDefined();
    expect(result.current.errors.date).not.toBeDefined();
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/income",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("displays an error when post method fails", async () => {
    const { result } = renderHook(() =>
      useAddIncomeForm({ onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "receivedFrom", value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "amount", value: "1000.00" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "category", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "account", value: "2" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "date", value: "01/01/2020" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });
    vi.spyOn(toast, "error").mockImplementation(() => {});
    global.fetch = mockFetch;
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: vi.fn(),
      } as unknown as React.FormEvent);
    });
    expect(result.current.errors.receivedFrom).not.toBeDefined();
    expect(result.current.errors.amount).not.toBeDefined();
    expect(result.current.errors.category).not.toBeDefined();
    expect(result.current.errors.account).not.toBeDefined();
    expect(result.current.errors.date).not.toBeDefined();
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/income",
      expect.objectContaining({ method: "POST" })
    );
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Failed"));
  });
});
