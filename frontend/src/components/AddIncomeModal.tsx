import { useState, useEffect } from "react";
import Button from "./common/Button";
import FormInput from "./common/FormInput";
import FormSelect from "./common/FormSelect";
import { useAddIncomeForm } from "../hooks/useAddIncomeForm";

// TODO: implement checkbox logic to keep the modal open for adding another income

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: number;
  name: string;
}

interface Account {
  id: number;
  name: string;
}

const AddIncomeModal = ({ isOpen, onClose }: AddIncomeModalProps) => {
  const { incomeFormValues, handleChange, handleSubmit, errors } =
    useAddIncomeForm({ onClose });
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("Development mode: AddIncomeModal component loaded");
      // Mocking fetch for development purposes
      window.fetch = async (url: string): Promise<Response> => {
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
        if (url === "/api/accounts") {
          return {
            ok: true,
            json: async () => [
              { id: 1, name: "Bank A" },
              { id: 2, name: "Bank B" },
              { id: 3, name: "Cash" },
            ],
          } as Response;
        }
        return Promise.reject("Unknown URL");
      };
    }
    const fetchData = async () => {
      // TODO: consider adding logic for loading when categories and accounts are being fetched
      try {
        const [categoriesRes, accountsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/accounts"),
        ]);
        if (!categoriesRes.ok || !accountsRes.ok)
          throw new Error("Failed to fetch data");
        const categoriesData = await categoriesRes.json();
        const accountsData = await accountsRes.json();
        setCategories(categoriesData.map((cat: Category) => cat));
        setAccounts(accountsData.map((acc: Account) => acc));
      } catch {
        console.error("Error fetching data");
      }
    };
    fetchData();
  }, []);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Income</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            inputId="receivedFrom"
            label="Received From"
            value={incomeFormValues.receivedFrom}
            onChange={handleChange}
            errorMsg={errors.receivedFrom}
          />
          <FormInput
            inputId="amount"
            label="Amount"
            value={incomeFormValues.amount}
            onChange={handleChange}
            errorMsg={errors.amount}
          />
          <FormSelect
            inputId="category"
            label="Category"
            listItems={categories}
            value={incomeFormValues.category}
            onChange={handleChange}
            errorMsg={errors.category}
          />
          <FormSelect
            inputId="account"
            label="Account"
            listItems={accounts}
            value={incomeFormValues.account}
            onChange={handleChange}
            errorMsg={errors.account}
          />
          <FormInput
            inputId="date"
            label="Date Received"
            type="date"
            value={incomeFormValues.date}
            onChange={handleChange}
            errorMsg={errors.date}
          />
          <div className="flex-col items-center space-x-2">
            <label className="whitespace-nowrap mb-2 w-34" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              className="w-full mb-2 border p-2 resize-y rounded"
              value={incomeFormValues.comment}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2">
            <label>
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) => {
                  if (e.target.checked) {
                    // TODO: Logic to keep the modal open for adding another income
                  } else {
                    onClose();
                  }
                }}
              />
              Keep open to add another income
            </label>
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
