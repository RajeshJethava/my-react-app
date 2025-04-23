import { useState, useEffect } from "react";

export interface User {
  id: number;
  name: string;
  age: number;
  salary: number;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedAge, setEditedAge] = useState<number>(0);
  const [editedSalary, setEditedSalary] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:8888/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8888/users/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditedName(user.name);
    setEditedAge(user.age);
    setEditedSalary(user.salary);
  };

  const handleSave = (id: number) => {
    const updatedUser = {
      name: editedName,
      age: editedAge,
      salary: editedSalary,
    };

    fetch(`http://localhost:8888/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(users.map((user) => (user.id === id ? data : user)));
        setEditingUserId(null);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return {
    users,
    loading,
    error,
    editingUserId,
    editedName,
    editedAge,
    editedSalary,
    setEditedName,
    setEditedAge,
    setEditedSalary,
    handleEdit,
    handleSave,
    handleDelete,
  };
};