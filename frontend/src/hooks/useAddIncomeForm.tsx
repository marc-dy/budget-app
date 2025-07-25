import { useState } from "react";
import { toast } from "react-hot-toast";

export function useAddIncomeForm({ onClose }: { onClose: () => void }) {
  const [incomeFormValues, setIncomeFormValues] = useState({
    receivedFrom: "",
    amount: "",
    account: "",
    category: "",
    date: "",
    comment: "",
  });
  const [errors, setErrors] = useState<{
    receivedFrom?: string;
    amount?: string;
    category?: string;
    account?: string;
    date?: string;
  }>({});

  function validate() {
    const newErrors: typeof errors = {};
    if (!incomeFormValues.receivedFrom)
      newErrors.receivedFrom = "Received From is required";

    if (!incomeFormValues.amount) newErrors.amount = "Amount is required";
    else if (
      isNaN(Number(incomeFormValues.amount)) ||
      Number(incomeFormValues.amount) <= 0
    )
      newErrors.amount = "Amount must be a valid number greater than 0";

    if (!incomeFormValues.category) newErrors.category = "Category is required";
    if (!incomeFormValues.category) newErrors.account = "Account is required";

    if (!incomeFormValues.date) newErrors.date = "Date is required";
    else if (new Date(incomeFormValues.date).toString() === "Invalid Date")
      newErrors.date = "Date must be a valid date";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const saveIncome = async () => {
    if (!validate()) return;
    const incomeData = {
      receivedFrom: incomeFormValues.receivedFrom,
      amount: Number(incomeFormValues.amount),
      account: Number(incomeFormValues.account),
      category: Number(incomeFormValues.category),
      date: new Date(incomeFormValues.date).toISOString(),
      comments: incomeFormValues.comment,
    };
    if (import.meta.env.DEV) {
      console.log("Development mode: Saving income data", incomeData);
      toast.success("Income saved successfully!");
      // Mock saving in development mode
      onClose();
      return;
    }
    try {
      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeData),
      });
      toast.success("Income saved successfully!");

      if (!response.ok) {
        throw new Error("Failed to save income");
      }

      // Optionally, you can reset the form or close the modal after saving
      onClose();
    } catch (error) {
      console.error("Error saving income:", error);
      toast.error("Failed to save income. Please try again.");
    }
  };

  // TODO: How to handle income form values for numbers and dates?
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("handleChange", name, value);
    setIncomeFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveIncome();
  };

  return {
    incomeFormValues,
    handleChange,
    handleSubmit,
    errors,
  };
}
