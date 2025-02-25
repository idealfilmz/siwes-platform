import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:3000/login-lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staff_id: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      // Handle successful login here
      navigate("/dashboard");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Staff ID
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter staff id"
            value={username}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => login()}
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          login
        </button>
        {message}
      </div>
    </div>
  );
};
