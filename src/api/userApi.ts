import * as Sentry from "@sentry/react";

export interface User {
  id: number;
  name: string;
  age: number;
  salary: number;
}

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("http://localhost:8888/users");
    if (!response.ok) {
      const error = new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      Sentry.captureException(error); // Log the error to Sentry
      throw error; // Re-throw the error to propagate it
    }
    return await response.json();
  } catch (err) {
    Sentry.captureException(err); // Log the error to Sentry
    throw err; // Re-throw the error to propagate it
  }
};

// Create a new user
export const createUser = async (newUser: User): Promise<User> => {
  try {
    const response = await fetch("http://localhost:8888/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const error = new Error(`Failed to create user: ${response.status} ${response.statusText}`);
      Sentry.captureException(error); // Log the error to Sentry
      throw error; // Re-throw the error to propagate it
    }

    // Assume the server does not return a body
    return newUser;
  } catch (err) {
    Sentry.captureException(err); // Log the error to Sentry
    throw err; // Re-throw the error to propagate it
  }
};

// Update an existing user
export const updateUser = async (id: number, updatedUser: Partial<User>): Promise<User> => {
  try {
    const response = await fetch(`http://localhost:8888/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      const error = new Error(`Failed to update user: ${response.status} ${response.statusText}`);
      Sentry.captureException(error); // Log the error to Sentry
      throw error; // Re-throw the error to propagate it
    }
    return await response.json();
  } catch (err) {
    Sentry.captureException(err); // Log the error to Sentry
    throw err; // Re-throw the error to propagate it
  }
};

// Delete a user
export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:8888/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
      Sentry.captureException(error); // Log the error to Sentry
      throw error; // Re-throw the error to propagate it
    }
  } catch (err) {
    Sentry.captureException(err); // Log the error to Sentry
    throw err; // Re-throw the error to propagate it
  }
};

export {};