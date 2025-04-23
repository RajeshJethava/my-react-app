import React, { useEffect, useState } from "react";
import "./Users.css";

interface User {
  id: number;
  name: string;
  age: number;
  salary: number;
}

const Users: React.FC = () => {
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
        // alert(err.message);
        throw new Error(err.message);
      });
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditedName(user.name);
    setEditedAge(user.age);
    setEditedSalary(user.salary);
  };

  const handleSave = (id: number) => {
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) return;

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
          console.error("Testing error handling");
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(users.map((user) => (user.id === id ? data : user)));
        setEditingUserId(null);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleCreateUser = () => {
    const newUser = {
      id: users.length + 1, // Generate a new ID (you can replace this with a backend-generated ID)
      name: "New User",
      age: 25,
      salary: 50000,
    };
  
    // Add the new user to the list
    fetch("http://localhost:8888/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to create user");
          alert("Failed to create user. Please try again.");
          return; // Stop further execution
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          // Update the users list with the new user
          setUsers((prevUsers) => [...prevUsers, data]); // Directly update the state
          setEditedName("");
          setEditedAge(0);
          setEditedSalary(0);
        }
      })
      .catch((err) => {
        console.error("Error:", err.message);
        alert("An unexpected error occurred. Please try again.");
      });
  };

  if (loading) {
    return <div className="users-container">Loading...</div>;
  }

  if (error) {
    return <div className="users-container">Error: {error}</div>;
  }

  return (
    <div className="users-container">
      <h1>User List</h1>
      <button onClick={handleCreateUser}>Create User</button>
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