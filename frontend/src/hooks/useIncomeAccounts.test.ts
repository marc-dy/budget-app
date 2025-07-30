import { renderHook, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { useIncomeAccounts } from "./useIncomeAccounts";

describe("useIncomeAccounts", () => {
  beforeEach(() => {
    vi.stubEnv("DEV", false);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("fetches and returns the list of accounts", async () => {
    const mockAccounts = [
      { id: 1, name: "Bank A" },
      { id: 2, name: "Bank B" },
      { id: 3, name: "Cash" },
    ];

    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockAccounts,
    });
    const { result } = renderHook(() => useIncomeAccounts());
    await waitFor(() => {
      expect(result.current.length).toEqual(3);
    });
    expect(result.current).toEqual(mockAccounts);
  });

  it("handles error gracefully", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: async () => ({ message: "Not Found" }),
    });
    const { result } = renderHook(() => useIncomeAccounts());
    await waitFor(() => {
      expect(result.current.length).toEqual(0);
    });
    expect(result.current).toEqual([]);
  });
});
