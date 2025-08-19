import { useState } from "react";
import IncomeModal from "./IncomeModal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Income } from "../types/IncomeData";

const EditIncomeButton = ({ income }: { income: Income }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        role="button"
        className="flex items-center gap-1 hover:underline"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <PencilSquareIcon className="h-4 w-4" />
        Edit
      </button>
      {isModalOpen && (
        <IncomeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="edit"
          income={income}
        />
      )}
    </>
  );
};

export default EditIncomeButton;
