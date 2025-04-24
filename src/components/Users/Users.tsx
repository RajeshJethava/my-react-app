import React, { useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser, User } from "../../api/userApi";
import "./Users.css";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedAge, setEditedAge] = useState<number>(0);
  const [editedSalary, setEditedSalary] = useState<number>(0);
  const [newUser, setNewUser] = useState<Partial<User> | null>(null); // State for new user row

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!newUser || !newUser.name || !newUser.age || !newUser.salary) {
      alert("Please fill out all fields for the new user.");
      return;
    }

    try {
      await createUser(newUser as User); // Create the new user
      const updatedUsers = await fetchUsers(); // Re-fetch the updated user list
      setUsers(updatedUsers); // Update the state with the new user list
      setNewUser(null); // Clear the new user row
    } catch (err) {
      alert("Failed to create user. Please try again.");
    }
  };

  const handleAddNewRow = () => {
    setNewUser({ name: "", age: 0, salary: 0 }); // Initialize a new user row
  };

  const handleSave = async (id: number) => {
    const updatedUser = {
      name: editedName,
      age: editedAge,
      salary: editedSalary,
    };

    try {
      const savedUser = await updateUser(id, updatedUser);
      setUsers(users.map((user) => (user.id === id ? savedUser : user)));
      setEditingUserId(null);
    } catch (err) {
      setError("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user.id); // Set the ID of the user being edited
    setEditedName(user.name); // Populate the name field
    setEditedAge(user.age); // Populate the age field
    setEditedSalary(user.salary); // Populate the salary field
  };

  if (loading) {
    return <div className="users-container">Loading...</div>;
  }

  if (error) {
    return <div className="users-container">Error: {error}</div>;
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <button className="add-user-button" onClick={handleAddNewRow}>
          Add New User
        </button>
      </div>
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
          {newUser && (
            <tr>
              <td>#</td> {/* Display hash instead of "New" */}
              <td>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newUser.age}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, age: Number(e.target.value) }))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={newUser.salary}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, salary: Number(e.target.value) }))
                  }
                />
              </td>
              <td>
                <button onClick={handleCreateUser}>Save</button>
                <button onClick={() => setNewUser(null)}>Cancel</button>
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
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
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;