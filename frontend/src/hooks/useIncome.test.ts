import { renderHook, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { useIncome } from "./useIncome";

describe("useIncome", () => {
  beforeEach(() => {
    vi.stubEnv("DEV", false);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("fetches and returns the list of income", async () => {
    const mockIncome = [
      {
        id: 1,
        receivedFrom: "Client A",
        amount: 1000,
        account: "Bank A",
        category: "Salary",
        date: "2023-10-01",
        comments: "Monthly salary",
      },
      {
        id: 2,
        receivedFrom: "Client B",
        amount: 500,
        account: "Bank B",
        category: "Freelance",
        date: "2023-10-05",
        comments: "Freelance work",
      },
    ];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockIncome,
    });
    const { result } = renderHook(() => useIncome());
    await waitFor(() => {
      expect(result.current.length).toEqual(2);
    });
    expect(result.current).toEqual(mockIncome);
  });

  it("handles error gracefully", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({ message: "Not Found" }),
    });
    const { result } = renderHook(() => useIncome());
    await waitFor(() => {
      expect(result.current.length).toEqual(0);
    });
    expect(result.current).toEqual([]);
  });
});
