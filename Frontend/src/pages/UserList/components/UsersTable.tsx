import { FiTrash2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { User, UserWithBadge } from "../UserList";
import { FaIdCard } from "react-icons/fa";

export interface UsersTablePRops {
  data: UserWithBadge[];
  onUserEdit: (user: User) => void;
  onUserDelete: (id: string | number) => void;
}

const UsersTable: React.FC<UsersTablePRops> = ({
  data,
  onUserEdit,
  onUserDelete,
}) => {
  const handleBadgeClick = (id: string) => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3000/badge/${id}`;
    fetch(url, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => response.blob())
  .then(blob => {
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `badge_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); 
    URL.revokeObjectURL(blobUrl); 
})
  };

  console.log("data", data);
  return (
    <>
      <div className="sticky top-0 text-center flex justify-between items-center py-2 px-10 bg-gray-100 border-y border-gray-200">
        <h1 className="text-left font-normal text-lg w-full text-gray-500">
          NOME
        </h1>
        <h1 className="font-normal text-lg w-full text-gray-500">EMAIL</h1>
        <h1 className="font-normal text-lg w-full text-gray-500">
          NÍVEL DE ACESSO
        </h1>
        <span className="flex">
          <MdOutlineModeEdit className="text-transparent text-2xl mx-2" />
          <FiTrash2 className="text-transparent text-2xl mx-2" />
        </span>
      </div>
      {data.map((user, index) => (
        <div
          key={index}
          className="text-center pt-6 pb-14 flex justify-between items-center py-2 px-10 border-b border-gray-200"
        >
          <h1 className="text-left font-normal text-md w-full text-gray-500">
            {user.name}
          </h1>
          <h1 className="font-normal text-md w-full text-gray-500">
            {user.email}
          </h1>
          <h1 className="font-normal text-md w-full text-gray-500">
            {user.level}
          </h1>
          <span className="flex">
            <FaIdCard
              className="text-primary text-2xl mx-2 hover:cursor-pointer"
              onClick={() => handleBadgeClick(user.id)}
            />
            <MdOutlineModeEdit
              onClick={() => onUserEdit(user)}
              className="text-primary text-2xl mx-2 hover:cursor-pointer"
            />
            <FiTrash2
              onClick={() => onUserDelete(user.id)}
              className="text-red-500 text-2xl mx-2 hover:cursor-pointer"
            />
          </span>
        </div>
      ))}
    </>
  );
};

export default UsersTable;
