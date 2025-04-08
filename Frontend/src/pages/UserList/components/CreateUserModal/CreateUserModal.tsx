import Modal from "../../../../components/Modal";
import { NewUser } from "../../UserList";
import SelectProfileImage from "../../../../components/SelectProfileImage";
import useCreateUserModal from "./useCreateUserModal";

export interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateUser: (user: NewUser) => void;
}

const CreateUserModal = ({
  isOpen,
  onClose,
  onCreateUser,
}: CreateUserModalProps) => {
  const {
    fields,
    handleChange,
    handleSave,
    isValidCreateUser,
    handleFileChange,
    imageLink,
  } = useCreateUserModal(onClose, onCreateUser, isOpen);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full text-left flex flex-col gap-4">
        <h3 className="font-medium text-2xl">Criar Usuario</h3>
        <SelectProfileImage
          imageLink={imageLink}
          handleFileChange={handleFileChange}
        />
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
          disabled={isValidCreateUser}
          onClick={handleSave}
          className="btn btn-primary w-fit self-end mt-4"
        >
          Criar
        </button>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
