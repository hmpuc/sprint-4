import Modal from "../../../../components/Modal";
import SelectProfileImage from "../../../../components/SelectProfileImage";
import TextField from "../../../../components/TextField";
import { User } from "../../UserList";
import useEditUserModal from "./useEditUserModal";

export interface SaveUserModalProps {
  userData: User | null;
  onClose: () => void;
  onUserSave: (user: User) => void;
}

const EditUserModal: React.FC<SaveUserModalProps> = ({
  userData,
  onClose,
  onUserSave,
}) => {
  const {
    fields,
    state,
    handleChange,
    handleSave,
    isValidEditUser,
    handleFileChange,
    imageLink,
  } = useEditUserModal({
    userData,
    onUserSave,
    onClose,
  });

  return (
    <Modal isOpen={!!userData} onClose={onClose}>
      <div className="w-full text-left flex flex-col gap-2">
        <h3 className="font-medium text-2xl">Editar Usuario</h3>
        <SelectProfileImage
          imageLink={imageLink}
          handleFileChange={handleFileChange}
        />
        {fields.map((field, index) => (
          <TextField
            placeholder={field.placeholder}
            type={field.type}
            onChange={(e) =>
              handleChange(field.initialValueKey, e.target.value)
            }
            label={field.label}
            value={state[field.initialValueKey]}
            key={index}
          />
        ))}
        <button
          disabled={isValidEditUser}
          onClick={handleSave}
          className="btn btn-primary w-fit self-end mt-4"
        >
          Salvar
        </button>
      </div>
    </Modal>
  );
};

export default EditUserModal;
