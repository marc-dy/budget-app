import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  itemId: number;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  itemId,
}: DeleteModalProps) => {
  const handleDelete = () => {
    onDelete(itemId);
  };
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded shadow-lg w-lg">
        <div className="flex justify-center">
          <ExclamationCircleIcon className="h-12 w-12 text-red-500" />
          <h2 id="delete-modal" className="text-xl text-center pl-3 pt-3">
            Are you sure?
          </h2>
        </div>

        <p className="text-gray-700 mt-5 text-center">
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </p>
        <div className="mt-8 flex justify-center gap-5">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            aria-label="delete-button"
            type="submit"
            variant="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
