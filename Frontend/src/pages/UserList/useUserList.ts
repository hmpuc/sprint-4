import { useState } from "react";
import { NewUser, User, UserWithBadge } from "./UserList";
import useUserAPI from "../../hooks/useUserAPI";

const useUserList = () => {
  const { getUsers, createUser, editUser, deleteUser, getBadgeByUserId } =
    useUserAPI();

  const [apiData, setApiData] = useState<UserWithBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [EditUserModalData, setEditUserModalData] = useState<User | null>(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const fetchUsers = async () => {
    const users = await getUsers();
    if (users) {
      const usersWithBadge = await Promise.all(
        users.map(async (user: User) => {
          const badge = await getBadgeByUserId(user.id);
          return { ...user, badge_url: badge?.badge_url };
        }),
      );
      setApiData(usersWithBadge);
      setLoading(false);
    }
  };

  const handleCreateUser = async (user: NewUser) => {
    const newUser = await createUser(user);
    if (newUser) {
      const badge = await getBadgeByUserId(newUser.id);
      setApiData((prevData) => [
        ...prevData,
        { ...newUser, badge_url: badge?.badge_url },
      ]);
    }
  };

  const handleSaveEditUser = (user: User) => {
    editUser(user).then((updatedUser) => {
      if (updatedUser) {
        setApiData((prevData) => {
          const index = prevData.findIndex((u) => u.id === updatedUser.id);
          return [
            ...prevData.slice(0, index),
            updatedUser,
            ...prevData.slice(index + 1),
          ];
        });
      }
    });
  };

  const handleDeleteUser = (id: string | number) => {
    deleteUser(id).then((success) => {
      if (success) {
        setApiData((prevData) => {
          return prevData.filter((u) => u.id !== id);
        });
      }
    });
  };

  const handleEditUser = (user: User) => {
    setEditUserModalData(user);
  };

  return {
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
  };
};

export default useUserList;
