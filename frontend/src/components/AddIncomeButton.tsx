import { useState } from "react";
import Button from "./common/Button";
import AddIncomeModal from "./AddIncomeModal";

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
        <AddIncomeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default AddIncomeButton;
