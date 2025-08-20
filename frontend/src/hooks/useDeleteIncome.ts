import { toast } from "react-hot-toast";

export function useDeleteIncome(id: number, onClose: () => void) {
  const deleteIncome = async () => {
    if (import.meta.env.DEV) {
      console.log("Development mode: Delete income data", id);
      toast.success("Income deleted successfully!");
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
      onClose();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income.");
    }
  };
  return { deleteIncome };
}
