"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  password: string;
  role: "teacher" | "student";
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const router = useRouter();

  // List of valid users
  const users: User[] = [
    { username: "teacher123", password: "password", role: "teacher" },
    { username: "Naman_gupta", password: "password", role: "student" },
    { username: "Sahaj_chouhan", password: "password", role: "student" },
    { username: "Abhijeet_pandey", password: "password", role: "student" },
    { username: "Saarthak_sharma", password: "password", role: "student" },
    { username: "student1", password: "password", role: "student" },
    { username: "Atul Mishra", password: "password", role: "teacher" },
    // Add more users as needed
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // Check if user exists in the list and matches the role
    const validUser = users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );

    if (validUser) {
      // Store logged-in user in localStorage
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ username: validUser.username, role: validUser.role })
      );

      // Show welcome message
      alert(`Welcome ${validUser.username}! You are successfully logged in.`);

      // Redirect to AttendancePage after a short delay (1 seconds for example)
      setTimeout(() => {
        router.push("/attendance");
      }, 500); // 0.5 seconds delay before redirecting
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom right, #56CCF2, #2F80ED)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "800px",
          textAlign: "center",
        }}
      >
        <h1>Mechanical Department LNMIIT Attendance System</h1>
        <img
          src="2560px-Logo-LNMIIT.svg.png"
          alt="LNMIIT Logo"
          style={{ width: "200px", marginBottom: "20px" }}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/200";
            console.error("Logo not found, loading fallback image.");
          }}
        />
        <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "teacher" | "student")}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              background: "#2F80ED",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
