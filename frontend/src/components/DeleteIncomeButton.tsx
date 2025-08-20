import { useState } from "react";
import DeleteModal from "./common/DeleteModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteIncome } from "../hooks/useDeleteIncome";
//import type { Income } from "../types/IncomeData";

const DeleteIncomeButton = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteIncome } = useDeleteIncome(id, () => setIsModalOpen(false));
  return (
    <>
      <button
        role="button"
        className="flex items-center gap-1 hover:underline"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <TrashIcon className="h-4 w-4" />
        Delete
      </button>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={deleteIncome}
          itemId={id}
        />
      )}
    </>
  );
};

export default DeleteIncomeButton;
