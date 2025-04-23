import React from "react";
import { User } from "./hooks/useUsers";

interface UserRowProps {
  user: User;
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

const UserRow: React.FC<UserRowProps> = ({
  user,
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
    <tr>
      <td>{user.id}</td>
      <td>
        {editingUserId === user.id ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {editingUserId === user.id ? (
          <input
            type="number"
            value={editedAge}
            onChange={(e) => setEditedAge(Number(e.target.value))}
          />
        ) : (
          user.age
        )}
      </td>
      <td>
        {editingUserId === user.id ? (
          <input
            type="number"
            value={editedSalary}
            onChange={(e) => setEditedSalary(Number(e.target.value))}
          />
        ) : (
          `$${user.salary.toLocaleString()}`
        )}
      </td>
      <td>
        {editingUserId === user.id ? (
          <button onClick={() => handleSave(user.id)}>Save</button>
        ) : (
          <button onClick={() => handleEdit(user)}>Edit</button>
        )}
        <button className="delete" onClick={() => handleDelete(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;