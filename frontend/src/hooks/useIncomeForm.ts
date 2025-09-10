import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { Income } from "../types/IncomeData";

export function useIncomeForm({
  income,
  mode,
  onClose,
}: {
  income: Income | undefined;
  mode: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [incomeFormValues, setIncomeFormValues] = useState({
    id: income?.id ?? 0,
    receivedFrom: income?.receivedFrom ?? "",
    amount: income?.amount ? String(income.amount) : "",
    account: income?.account ? String(income.account.id) : "",
    category: income?.category ? String(income.category.id) : "",
    date: income?.date ?? "",
    comments: income?.comments ?? "",
  });
  const [errors, setErrors] = useState<{
    receivedFrom?: string;
    amount?: string;
    category?: string;
    account?: string;
    date?: string;
  }>({});

  const addIncomeMutation = useMutation({
    mutationFn: async (incomeData: {
      receivedFrom: string;
      amount: number;
      accountId: number;
      categoryId: number;
      date: string;
      comments: string;
    }) => {
      /* istanbul ignore if -- @preserve */
      if (import.meta.env.DEV) {
        console.log("Development mode: Saving income data", incomeData);
        toast.success("Income saved successfully!");
        // Mock saving in development mode
        onClose();
        return;
      }
      try {
        const response = await fetch("/api/incomes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(incomeData),
        });
        if (!response.ok) {
          throw new Error("Failed to save income");
        }
        toast.success("Income saved successfully!");
        onClose();
      } catch (error) {
        console.error("Error saving income:", error);
        toast.error("Failed to save income. Please try again.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });

  interface editIncomeParams {
    id: number;
    incomeData: {
      receivedFrom: string;
      amount: number;
      accountId: number;
      categoryId: number;
      date: string;
      comments: string;
    };
  }
  const editIncomeMutation = useMutation({
    mutationFn: async ({ id, incomeData }: editIncomeParams) => {
      /* istanbul ignore if -- @preserve */
      if (import.meta.env.DEV) {
        console.log("Development mode: Edit income data", incomeData);
        toast.success("Income updated successfully!");
        // Mock saving in development mode
        onClose();
        return;
      }
      try {
        const response = await fetch("/api/incomes/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(incomeData),
        });

        if (!response.ok) {
          throw new Error("Failed to update income");
        }
        toast.success("Income updated successfully!");
        // TODO: Optionally, you can reset the form or close the modal
        // If checkbox is checked in modal, do not close and just clear the form.
        onClose();
      } catch (error) {
        console.error("Error updating income:", error);
        toast.error("Failed to update income. Please try again.");
      }
    },
    onSuccess: () => {
      console.log("sumaccess");
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
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
      accountId: Number(incomeFormValues.account),
      categoryId: Number(incomeFormValues.category),
      date: new Date(incomeFormValues.date).toISOString(),
      comments: incomeFormValues.comments,
    };
    addIncomeMutation.mutate(incomeData);
  };

  // TODO: How to handle income form values for numbers and dates?
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setIncomeFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateIncome = async () => {
    if (!validate()) return;
    const incomeData = {
      receivedFrom: incomeFormValues.receivedFrom,
      amount: Number(incomeFormValues.amount),
      accountId: Number(incomeFormValues.account),
      categoryId: Number(incomeFormValues.category),
      date: new Date(incomeFormValues.date).toISOString(),
      comments: incomeFormValues.comments,
    };
    editIncomeMutation.mutate({
      id: incomeFormValues.id,
      incomeData: incomeData,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode == "add") {
      saveIncome();
    } else {
      updateIncome();
    }
  };

  return {
    incomeFormValues,
    handleChange,
    handleSubmit,
    errors,
  };
}
