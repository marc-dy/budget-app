import type { IncomeData } from "../types/IncomeData";

function populateTableData(incomeList: Array<IncomeData>) {
  return incomeList.map((income) => (
    <tr
      key={income.id}
      className="hover:bg-gray-100 odd:bg-white even:bg-gray-200"
    >
      <td className="px-4 py-2 border text-center">{income.receivedFrom}</td>
      <td className="px-4 py-2 border text-center">{income.amount}</td>
      <td className="px-4 py-2 border text-center">{income.account}</td>
      <td className="px-4 py-2 border text-center">{income.category}</td>
      <td className="px-4 py-2 border text-center">{income.date}</td>
      <td className="px-4 py-2 border text-center">{income.comments}</td>
    </tr>
  ));
}

const IncomeTable = ({ incomeList }: { incomeList: IncomeData[] }) => {
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
        </tr>
      </thead>
      <tbody>{populateTableData(incomeList)}</tbody>
    </table>
  );
};

export default IncomeTable;
