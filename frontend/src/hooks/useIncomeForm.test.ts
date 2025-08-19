import { renderHook, act } from "@testing-library/react";
import { toast } from "react-hot-toast";
import { vi } from "vitest";
import { useIncomeForm } from "./useIncomeForm";
import type { Income } from "../types/IncomeData";

describe("useIncomeForm", () => {
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
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "comments", value: "This is a comment" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });
    expect(result.current.incomeFormValues.comments).toBe("This is a comment");
  });

  it("returns errors on empty fields", async () => {
    const { result } = renderHook(() =>
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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

  it("updates input form value if income is passed", () => {
    const income: Income = {
      id: 1,
      receivedFrom: "Client A",
      amount: 1000,
      account: {
        id: 1,
        name: "Bank A",
      },
      category: {
        id: 1,
        name: "Salary",
      },
      date: "2023-10-01",
      comments: "Monthly salary",
    };
    const { result } = renderHook(() =>
      useIncomeForm({ income: income, mode: "edit", onClose: mockClose })
    );
    expect(result.current.incomeFormValues.id).toBe(1);
    expect(result.current.incomeFormValues.receivedFrom).toBe("Client A");
    expect(result.current.incomeFormValues.amount).toBe("1000");
    expect(result.current.incomeFormValues.account).toBe("1");
    expect(result.current.incomeFormValues.category).toBe("1");
    expect(result.current.incomeFormValues.date).toBe("2023-10-01");
    expect(result.current.incomeFormValues.comments).toBe("Monthly salary");
  });

  it("returns error if amount is negative", async () => {
    const { result } = renderHook(() =>
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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

  it("sends a POST request on submit when adding income", async () => {
    const { result } = renderHook(() =>
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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
      "/api/incomes",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("sends a PUT request on submit when editing an income", async () => {
    const income: Income = {
      id: 1,
      receivedFrom: "Client A",
      amount: 1000,
      account: {
        id: 1,
        name: "Bank A",
      },
      category: {
        id: 1,
        name: "Salary",
      },
      date: "2025-01-01",
      comments: "Monthly salary",
    };
    const { result } = renderHook(() =>
      useIncomeForm({ income: income, mode: "edit", onClose: mockClose })
    );

    act(() => {
      result.current.handleChange({
        target: { name: "receivedFrom", value: "Client B" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "amount", value: "3000" },
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
        target: { name: "date", value: "2024-12-31" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleChange({
        target: { name: "comments", value: "Gift test" },
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
    const expectedIncomeData = {
      id: 1,
      receivedFrom: "Client B",
      amount: 3000,
      accountId: 2,
      categoryId: 2,
      date: "2024-12-31T00:00:00.000Z",
      comments: "Gift test",
    };
    expect(result.current.errors.receivedFrom).not.toBeDefined();
    expect(result.current.errors.amount).not.toBeDefined();
    expect(result.current.errors.category).not.toBeDefined();
    expect(result.current.errors.account).not.toBeDefined();
    expect(result.current.errors.date).not.toBeDefined();
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/incomes",
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expectedIncomeData),
      })
    );
  });

  it("displays an error when post method fails", async () => {
    const { result } = renderHook(() =>
      useIncomeForm({ income: undefined, mode: "add", onClose: mockClose })
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
    vi.spyOn(toast, "error").mockImplementation(vi.fn());
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
      "/api/incomes",
      expect.objectContaining({ method: "POST" })
    );
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Failed"));
  });

  it("displays an error when PUT method fails", async () => {
    const income: Income = {
      id: 1,
      receivedFrom: "Client A",
      amount: 1000,
      account: {
        id: 1,
        name: "Bank A",
      },
      category: {
        id: 1,
        name: "Salary",
      },
      date: "2025-01-01",
      comments: "Monthly salary",
    };
    const { result } = renderHook(() =>
      useIncomeForm({ income: income, mode: "edit", onClose: mockClose })
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
    vi.spyOn(toast, "error").mockImplementation(vi.fn());
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
      "/api/incomes",
      expect.objectContaining({ method: "PUT" })
    );
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Failed"));
  });
});
