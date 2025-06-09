// src/pages/AuthPage.js
import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const endpoint = isLogin ? "login" : "register";
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        username,
        password,
      });

      if (!isLogin && res.status === 201) {
        alert("Registered successfully!");
        setIsLogin(true);
      }

      if (isLogin && res.status === 200) {
        alert("Login successful!");
        // Optionally redirect or save token
      }
    } catch (err) {
      if (!isLogin && err.response?.status === 409) {
        alert("User already exists. Please log in.");
        setIsLogin(true);
      } else if (isLogin && err.response?.status === 401) {
        alert("Invalid credentials. Try again.");
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSubmit} style={styles.button}>
        {isLogin ? "Login" : "Register"}
      </button>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span style={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login here"}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
  },
  toggle: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default AuthPage;
