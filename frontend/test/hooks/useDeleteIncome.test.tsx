import { renderHook, act } from "@testing-library/react";
import { queryClientWrapper } from "../utils/QueryClientProviderWrapper";
import { toast } from "react-hot-toast";
import { vi } from "vitest";
import { useDeleteIncome } from "../../src/hooks/useDeleteIncome";

describe("useDeleteIncome", () => {
  beforeEach(() => {
    vi.stubEnv("DEV", false);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });
  const mockClose = vi.fn();
  it("handleDelete sends a delete API request with ID", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
    });
    global.fetch = mockFetch;
    const wrapper = queryClientWrapper();
    const { result } = renderHook(() => useDeleteIncome(1, mockClose), {
      wrapper,
    });

    await act(async () => {
      await result.current.deleteIncome();
    });
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/incomes/1",
      expect.objectContaining({ method: "DELETE" })
    );
  });

  it("displays an error when DELETE method fails", async () => {
    const wrapper = queryClientWrapper();
    const { result } = renderHook(() => useDeleteIncome(1, mockClose), {
      wrapper,
    });

    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    });
    vi.spyOn(toast, "error").mockImplementation(vi.fn());
    global.fetch = mockFetch;
    await act(async () => {
      await result.current.deleteIncome();
    });
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/incomes/1",
      expect.objectContaining({ method: "DELETE" })
    );
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Failed"));
  });
});
