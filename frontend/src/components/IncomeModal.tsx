import Button from "./common/Button";
import FormInput from "./common/FormInput";
import FormSelect from "./common/FormSelect";
import type { Income } from "../types/IncomeData";
import { useIncomeForm } from "../hooks/useIncomeForm";
import { useIncomeCategories } from "../hooks/useIncomeCategories";
import { useIncomeAccounts } from "../hooks/useIncomeAccounts";

// TODO: implement checkbox logic to keep the modal open for adding another income
// TODO: Notify about unsaved changes

interface IncomeModalProps {
  income?: Income;
  isOpen: boolean;
  mode: "add" | "edit";
  onClose: () => void;
}

const IncomeModal = ({ isOpen, onClose, mode, income }: IncomeModalProps) => {
  const categories = useIncomeCategories();
  const accounts = useIncomeAccounts();
  const { incomeFormValues, handleChange, handleSubmit, errors } =
    useIncomeForm({ income, mode, onClose });
  const header_label = mode == "add" ? "Add Income" : "Edit Income";
  const button_label = mode == "add" ? "Save" : "Update";

  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="income-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded shadow-lg w-lg">
        <h2 id="income-modal" className="text-xl font-semibold mb-4">
          {header_label}
        </h2>
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
          <div className="flex-col space-x-2">
            <label className="whitespace-nowrap mb-2 w-34" htmlFor="comment">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              className="w-full mb-2 border p-2 resize-y rounded"
              value={incomeFormValues.comments}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2">
            {mode == "add" && (
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={(e) => {
                    if (e.target.checked) {
                      // TODO: Logic to keep the modal open for adding another income
                    }
                  }}
                />
                Keep open to add another income
              </label>
            )}
            <Button type="submit" variant="primary">
              {button_label}
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

export default IncomeModal;
