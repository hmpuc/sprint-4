import { useState } from "react";
import { NewUser, User } from "../pages/UserList/UserList";

export interface LoginRequestBody {
  email: string;
  password: string;
}

const BASE_URL = "http://localhost:3000";

const useUserAPI = () => {
  console.log("useUserAPI");
  const [error, setError] = useState<string | null>(null);

  const postLogin = async (body: LoginRequestBody) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const createUser = async (body: NewUser) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar usuário");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const editUser = async (body: User) => {
    setError(null);
    // create new body without id;
    const { id, ...newBody } = body;

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBody),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar usuário");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const getUsers = async () => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users`);

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const deleteUser = async (id: string | number) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const getUsersPDF = async () => {
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/pdf-report`);

      if (!response.ok) {
        throw new Error("Erro ao buscar o relatório");
      }

      const blob = await response.blob();

      // Criar URL a partir do Blob
      const url = window.URL.createObjectURL(blob);

      // Criar um link de download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.pdf");

      // Simular clique no link para iniciar o download
      document.body.appendChild(link);
      link.click();

      // Remover o link depois de usar (verificar se parentNode não é null)
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }

      // Liberar URL para evitar vazamento de memória
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      // Asserção de tipo para garantir que error tem a propriedade message
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
      return null;
    }
  };

  const getBadgeByUserId = async (id: string) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/badge/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar badge");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const getUserById = async (id: string) => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
      }

      const data = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  return {
    postLogin,
    error,
    getUsers,
    createUser,
    editUser,
    deleteUser,
    getUsersPDF,
    getBadgeByUserId,
    getUserById,
  };
};

export default useUserAPI;
