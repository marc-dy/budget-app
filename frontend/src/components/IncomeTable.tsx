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
  return (
    <table className="table-auto w-full border border-gray-300">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="px-4 py-1 border">Received From</th>
          <th className="px-4 py-1 border">Amount</th>
          <th className="px-4 py-1 border">Account</th>
          <th className="px-4 py-1 border">Category</th>
          <th className="px-4 py-1 border">Date</th>
          <th className="px-4 py-1 border">Comments</th>
          <th className="px-4 py-1 border">Actions</th>
        </tr>
      </thead>
      <tbody>{populateTableData(incomes)}</tbody>
    </table>
  );
};

export default IncomeTable;
