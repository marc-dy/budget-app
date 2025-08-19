import { useState, useEffect } from "react";
import type { Income } from "../types/IncomeData";

export function useIncomes() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("Development mode: Income component loaded");
      // Mocking fetch for development purposes
      window.fetch = async (url: URL | RequestInfo): Promise<Response> => {
        if (url === "/api/incomes") {
          return {
            ok: true,
            json: async () => [
              {
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
              },
              {
                id: 2,
                receivedFrom: "Client B",
                amount: 500,
                account: {
                  id: 2,
                  name: "Bank B",
                },
                category: {
                  id: 2,
                  name: "Freelance",
                },
                date: "2023-10-05",
                comments: "Freelance work",
              },
            ],
          } as Response;
        }
        return Promise.reject("Unknown URL");
      };
    }
    // Fetch income data from an API or other source
    // For now, we will use a placeholder
    const fetchData = async () => {
      try {
        const response = await fetch("/api/incomes");
        if (!response.ok) {
          throw new Error("Failed to fetch income data");
        }
        const data: Income[] = await response.json();
        setIncomes(data);
      } catch {
        console.error("Error fetching income data");
        // Handle error appropriately, e.g., show a notification or set an error state
        setIncomes([]); // Clear the list on error
      }
    };

    fetchData();
  }, []);
  return incomes;
}
