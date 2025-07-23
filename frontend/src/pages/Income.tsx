import { useState, useEffect } from "react";
import IncomeTable from "../components/IncomeTable";
import type { IncomeData } from "../types/IncomeData";

if (import.meta.env.DEV) {
  console.log("Development mode: Income component loaded");
  // Mocking fetch for development purposes
  window.fetch = async (url: string): Promise<Response> => {
    if (url === "/api/income") {
      return {
        ok: true,
        json: async () => [
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
        ],
      } as Response;
    }
    return Promise.reject("Unknown URL");
  };
}

export default function Income() {
  const [incomeList, setIncomeList] = useState<IncomeData[]>([]);
  useEffect(() => {
    // Fetch income data from an API or other source
    // For now, we will use a placeholder
    const fetchData = async () => {
      try {
        const response = await fetch("/api/income");
        if (!response.ok) {
          throw new Error("Failed to fetch income data");
        }
        const data: IncomeData[] = await response.json();
        setIncomeList(data);
      } catch {
        console.error("Error fetching income data");
        // Handle error appropriately, e.g., show a notification or set an error state
        setIncomeList([]); // Clear the list on error
      }
    };

    fetchData();
  });

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">Income</h1>
        <div className="ml-auto">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Income
          </button>
        </div>
      </div>

      {incomeList.length === 0 ? (
        <p>No income data available.</p>
      ) : (
        <IncomeTable incomeList={incomeList} />
      )}
    </div>
  );
}
