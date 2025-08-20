import { toast } from "react-hot-toast";

export function useDeleteIncome(id: number, onClose: () => void) {
  const deleteIncome = async () => {
    if (import.meta.env.DEV) {
      console.log("Development mode: Delete income data", id);
      toast.success("Income deleted successfully!");
      // Mock saving in development mode
      onClose();
      return;
    }
    try {
      const response = await fetch("/api/incomes/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete income");
      }
      toast.success("Income deleted successfully!");
      // TODO: Optionally, you can reset the form or close the modal
      // If checkbox is checked in modal, do not close and just clear the form.
      onClose();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income.");
    }
  };
  return { deleteIncome };
}
