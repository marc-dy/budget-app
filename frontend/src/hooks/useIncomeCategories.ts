import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

export function useIncomeCategories() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  useEffect(() => {
    /* istanbul ignore if -- @preserve */
    if (import.meta.env.DEV) {
      // Mocking fetch for development purposes
      window.fetch = async (url: URL | RequestInfo): Promise<Response> => {
        if (url === "/api/categories") {
          return {
            ok: true,
            json: async () => [
              { id: 1, name: "Salary" },
              { id: 2, name: "Freelance" },
              { id: 3, name: "Investment" },
            ],
          } as Response;
        }
        return Promise.reject("Unknown URL");
      };
    }
    const fetchData = async () => {
      // TODO: consider adding logic for loading when categories and accounts are being fetched
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const accountsData = await res.json();
        setCategories(accountsData.map((category: Category) => category));
      } catch {
        console.error("Error fetching data");
      }
    };
    fetchData();
  }, []);
  return categories;
}
