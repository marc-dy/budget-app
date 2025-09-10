import { useQuery } from "@tanstack/react-query";

export function useIncomes() {
  const query = useQuery({
    queryKey: ["incomes"],
    queryFn: () => {
      /* istanbul ignore if -- @preserve */
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
      return fetch("/api/incomes").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch income data");
        }
        return res.json();
      });
    },
  });
  return query;
}
