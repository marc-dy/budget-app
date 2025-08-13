import IncomeTable from "../components/IncomeTable";
import AddIncomeButton from "../components/AddIncomeButton";
import { useIncomes } from "../hooks/useIncomes";

export default function Income() {
  const incomes = useIncomes();

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">Income</h1>
        <div className="ml-auto">
          <AddIncomeButton />
        </div>
      </div>

      <IncomeTable incomes={incomes} />
    </div>
  );
}
