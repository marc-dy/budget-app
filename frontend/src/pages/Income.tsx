import IncomeTable from "../components/IncomeTable";
import AddIncomeButton from "../components/AddIncomeButton";
import { useIncomes } from "../hooks/useIncomes";

export default function Income() {
  const { data: incomes, isLoading, isError } = useIncomes();
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Error! Failed to fetch income list!</p>;
  }

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
