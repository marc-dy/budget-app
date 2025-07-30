import IncomeTable from "../components/IncomeTable";
import AddIncomeButton from "../components/AddIncomeButton";
import { useIncome } from "../hooks/useIncome";

export default function Income() {
  const incomeList = useIncome();

  return (
    <div className="p-6">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">Income</h1>
        <div className="ml-auto">
          <AddIncomeButton />
        </div>
      </div>

      <IncomeTable incomeList={incomeList} />
    </div>
  );
}
