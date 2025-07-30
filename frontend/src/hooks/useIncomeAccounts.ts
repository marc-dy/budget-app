import { useState, useEffect } from "react";

interface Account {
  id: number;
  name: string;
}

export function useIncomeAccounts() {
  const [accounts, setAccounts] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    /* istanbul ignore if */
    if (import.meta.env.DEV) {
      // Mocking fetch for development purposes
      window.fetch = async (url: URL | RequestInfo): Promise<Response> => {
        if (url === "/api/accounts") {
          return {
            ok: true,
            json: async () => [
              { id: 1, name: "Bank A" },
              { id: 2, name: "Bank B" },
              { id: 3, name: "Cash" },
            ],
          } as Response;
        }
        return Promise.reject("Unknown URL");
      };
    }
    const fetchData = async () => {
      // TODO: consider adding logic for loading when categories and accounts are being fetched
      try {
        const res = await fetch("/api/accounts");
        if (!res.ok) throw new Error("Failed to fetch accounts");
        const accountsData = await res.json();
        setAccounts(accountsData.map((acc: Account) => acc));
      } catch {
        console.error("Error fetching data");
      }
    };
    fetchData();
  }, []);
  return accounts;
}
