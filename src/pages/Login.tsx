import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    const stored = localStorage.getItem("Users");
    const users = stored ? JSON.parse(stored) : [];

    const foundUser = users.find((u: any) => u.username === username);

    if (!foundUser) {
      setError("User not found.");
      return;
    }

    if (foundUser.password !== password) {
      setError("Incorrect password.");
      return;
    }

    setError("");
    login(username, password);
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 dark:bg-none dark:bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-sm dark:shadow-orange-500 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          GeoCamp Finder Login
        </h2>

        {error && (
          <p className="bg-red-400/20 rounded text-red-500 text-sm mb-4 py-1 px-2 animate-shake">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-5 px-4 py-2 border rounded-xl bg-gray-50 dark:bg-slate-700 dark:text-white border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-10 px-4 py-2 border rounded-xl bg-gray-50 dark:bg-slate-700 dark:text-white border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!username || !password}
            className="w-full bg-slate-600 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-2 rounded-xl transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;