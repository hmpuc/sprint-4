import Modal from "../../../../components/Modal";
import { PlaceNoId } from "../../../../hooks/usePlaceAPI";
import useCreatePlaceModal from "./useCreatePlaceModal";

export interface CreatePlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlace: (user: PlaceNoId) => void;
}

const CreatePlaceModal = ({
  isOpen,
  onClose,
  onCreatePlace,
}: CreatePlaceModalProps) => {
  const { fields, handleChange, handleSave } = useCreatePlaceModal(
    onClose,
    onCreatePlace,
    isOpen,
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full text-left flex flex-col gap-4">
        <h3 className="font-medium text-2xl">Criar Local</h3>
        {fields.map((field, index) => (
          <div key={index}>
            <label className="text-lg">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              min={field.min}
              max={field.max}
              onChange={(e) =>
                handleChange(field.initialValueKey, e.target.value)
              }
              className="input input-primary input-bordered w-full"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="btn btn-primary w-fit self-end mt-4"
        >
          Criar Local
        </button>
      </div>
    </Modal>
  );
};

export default CreatePlaceModal;
