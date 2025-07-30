import Button from "./common/Button";
import FormInput from "./common/FormInput";
import FormSelect from "./common/FormSelect";
import { useAddIncomeForm } from "../hooks/useAddIncomeForm";
import { useIncomeCategories } from "../hooks/useIncomeCategories";
import { useIncomeAccounts } from "../hooks/useIncomeAccounts";

// TODO: implement checkbox logic to keep the modal open for adding another income
// TODO: Notify about unsaved changes

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddIncomeModal = ({ isOpen, onClose }: AddIncomeModalProps) => {
  const categories = useIncomeCategories();
  const accounts = useIncomeAccounts();
  const { incomeFormValues, handleChange, handleSubmit, errors } =
    useAddIncomeForm({ onClose });

  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-income"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded shadow-lg w-lg">
        <h2 id="add-income" className="text-xl font-semibold mb-4">
          Add Income
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
