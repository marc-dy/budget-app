import { useState } from "react";
import Button from "./common/Button";
import IncomeModal from "./IncomeModal";

const AddIncomeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add Income
      </Button>
      {isModalOpen && (
        <IncomeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="add"
        />
      )}
    </>
  );
};

export default AddIncomeButton;
