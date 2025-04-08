import Modal from "../../../../components/Modal";
import TextField from "../../../../components/TextField";
import { Place } from "../../../../hooks/usePlaceAPI";
import useEditPlaceModal from "./useEditPlaceModal";

export interface EditPlaceModalProps {
  placeData: Place | null;
  onClose: () => void;
  onPlaceSave: (user: Place) => void;
}

const EditPlaceModal: React.FC<EditPlaceModalProps> = ({
  placeData,
  onClose,
  onPlaceSave,
}) => {
  const isOpen = !!placeData;
  const { fields, handleChange, handleSave } = useEditPlaceModal(
    onClose,
    onPlaceSave,
    isOpen,
    placeData,
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full text-left flex flex-col gap-2">
        <h3 className="font-medium text-2xl">Editar Local</h3>
        {fields.map((field, index) => (
          <TextField
            placeholder={field.placeholder}
            type={field.type}
            onChange={(e) =>
              handleChange(field.initialValueKey, e.target.value)
            }
            label={field.label}
            value={fields[index].value}
            key={index}
          />
        ))}
        <button
          onClick={handleSave}
          className="btn btn-primary w-fit self-end mt-4"
        >
          Salvar
        </button>
      </div>
    </Modal>
  );
};

export default EditPlaceModal;
