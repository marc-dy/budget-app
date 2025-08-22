import { useMemo, useState } from "react";
import DeleteIncomeButton from "./DeleteIncomeButton";
import type { Income } from "../types/IncomeData";
import EditIncomeButton from "./EditIncomeButton";

function populateTableData(incomes: Array<Income>) {
  return incomes.map((income) => (
    <tr
      key={income.id}
      className="hover:bg-gray-100 odd:bg-white even:bg-gray-200"
    >
      <td className="px-4 py-2 border text-center">{income.receivedFrom}</td>
      <td className="px-4 py-2 border text-center">{income.amount}</td>
      <td className="px-4 py-2 border text-center">{income.account.name}</td>
      <td className="px-4 py-2 border text-center">{income.category.name}</td>
      <td className="px-4 py-2 border text-center">{income.date}</td>
      <td className="px-4 py-2 border text-center">{income.comments}</td>
      <td className="px-4 py-2 border">
        <div className="flex justify-center gap-4">
          <EditIncomeButton income={income} />
          <DeleteIncomeButton id={income.id} />
        </div>
      </td>
    </tr>
  ));
}

const IncomeTable = ({ incomes }: { incomes: Income[] }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Income;
    direction: "ascending" | "descending";
  }>({
    key: "date",
    direction: "descending",
  });

  function handleSort(key: keyof Income) {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  }

  // TODO: Sort in the backend in the future once pagination is implemented

  const sortedIncomes = useMemo(() => {
    const { key, direction } = sortConfig;

    const sortKeyMap: Record<string, (i: Income) => string | number> = {
      receivedFrom: (i) => i.receivedFrom,
      amount: (i) => i.amount,
      account: (i) => i.account.name,
      category: (i) => i.category.name,
      date: (i) => i.date,
      comments: (i) => i.comments,
    };
    return [...incomes].sort((a, b) => {
      const aVal = sortKeyMap[key](a);
      const bVal = sortKeyMap[key](b);

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * (direction === "ascending" ? 1 : -1);
      }

      return (
        ((aVal as number) > (bVal as number) ? 1 : -1) *
        (direction === "ascending" ? 1 : -1)
      );
    });
  }, [incomes, sortConfig]);

  return (
    <table className="table-auto w-full border border-gray-300">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th
            onClick={() => handleSort("receivedFrom")}
            className="cursor-pointer px-4 py-1 border"
          >
            Received From{" "}
            {sortConfig.key === "receivedFrom" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("amount")} className="px-4 py-1 border">
            Amount{" "}
            {sortConfig.key === "amount" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("account")}
            className="cursor-pointer px-4 py-1 border"
          >
            Account{" "}
            {sortConfig.key === "account" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("category")}
            className="cursor-pointer px-4 py-1 border"
          >
            Category{" "}
            {sortConfig.key === "category" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("date")}
            className="cursor-pointer px-4 py-1 border"
          >
            Date{" "}
            {sortConfig.key === "date" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </th>
          <th
            onClick={() => handleSort("comments")}
            className="cursor-pointer px-4 py-1 border"
          >
            Comments{" "}
            {sortConfig.key === "comments" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </th>
          <th className="px-4 py-1 border">Actions</th>
        </tr>
      </thead>
      <tbody>{populateTableData(sortedIncomes)}</tbody>
    </table>
  );
};

export default IncomeTable;
