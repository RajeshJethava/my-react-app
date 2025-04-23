import React from "react";
import UserRow from "./UserRow";
import { User } from "./hooks/useUsers";
import "./Users.css";

interface UserTableProps {
  users: User[];
  editingUserId: number | null;
  editedName: string;
  editedAge: number;
  editedSalary: number;
  setEditedName: (name: string) => void;
  setEditedAge: (age: number) => void;
  setEditedSalary: (salary: number) => void;
  handleEdit: (user: User) => void;
  handleSave: (id: number) => void;
  handleDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
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
}) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            editingUserId={editingUserId}
            editedName={editedName}
            editedAge={editedAge}
            editedSalary={editedSalary}
            setEditedName={setEditedName}
            setEditedAge={setEditedAge}
            setEditedSalary={setEditedSalary}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;