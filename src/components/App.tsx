import React from "react";
import Users from "./Users/Users";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>User Management System</h1>
      </header>
      <main>
        <Users />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 User Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;