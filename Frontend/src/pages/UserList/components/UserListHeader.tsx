import { GrDocumentPdf } from "react-icons/gr";

export interface UserListHeaderProps {
  getUsersPDF: () => void;
  setIsCreateUserModalOpen: (value: boolean) => void;
}
const UserListHeader: React.FC<UserListHeaderProps> = ({
  getUsersPDF,
  setIsCreateUserModalOpen,
}) => {
  return (
    <div className="flex justify-between items-center my-7 mx-10">
      <h1 className="font-semibold text-2xl ">Usuários</h1>
      <div className="flex gap-4">
        <GrDocumentPdf
          onClick={getUsersPDF}
          className="text-primary w-7 h-7 hover:opacity-70 hover:cursor-pointer"
        />
        <button
          onClick={() => setIsCreateUserModalOpen(true)}
          className="btn btn-sm btn-primary text-white rounded-full "
        >
          Adicionar Usuário
        </button>
      </div>
    </div>
  );
};

export default UserListHeader;
