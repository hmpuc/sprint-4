import { useEffect } from "react";
import useUserAPI from "../../hooks/useUserAPI";
import PageWrapper from "../../components/PageWrapper";
import useUserList from "./useUserList";
import UserListHeader from "./components/UserListHeader";
import CreateUserModal from "./components/CreateUserModal/CreateUserModal";
import EditUserModal from "./components/EditUserModal/EditUserModal";
import UsersTable from "./components/UsersTable";

export interface User {
  id: string;
  email: string;
  name: string;
  level: number;
  profile_img: string;
}
export type UserWithBadge = User & { badge_url: string };
export type NewUser = Omit<User, "id">;

/**
 * Page to list all the users in the application.
 * it includes all the components to create,
 * edit and delete places. It also includes a
 * button to download the users list as a PDF,
 * besides that it includes a button to acess
 * the badges of each user.
 */
const UserList = () => {
  const { getUsersPDF } = useUserAPI();

  const {
    apiData,
    loading,
    EditUserModalData,
    isCreateUserModalOpen,
    setIsCreateUserModalOpen,
    fetchUsers,
    handleCreateUser,
    handleSaveEditUser,
    handleDeleteUser,
    handleEditUser,
    setEditUserModalData,
  } = useUserList();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <PageWrapper>
      <>
        <UserListHeader
          getUsersPDF={getUsersPDF}
          setIsCreateUserModalOpen={setIsCreateUserModalOpen}
        />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <UsersTable
            onUserDelete={handleDeleteUser}
            data={apiData}
            onUserEdit={handleEditUser}
          />
        )}
        <EditUserModal
          onUserSave={handleSaveEditUser}
          userData={EditUserModalData}
          onClose={() => setEditUserModalData(null)}
        />
        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
          onCreateUser={handleCreateUser}
        />
      </>
    </PageWrapper>
  );
};

export default UserList;
