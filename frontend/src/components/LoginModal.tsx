import FormInput from "./common/FormInput";
import { useState } from "react";
import Button from "../components/common/Button";
import { useAuthDispatch, useAuthState } from "../hooks/useAuth";
import type { User } from "../types/User";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAuthDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    dispatch({ type: "LOGIN_START" });
    e.preventDefault();

    /* istanbul ignore if -- @preserve */
    if (import.meta.env.DEV) {
      console.log("Development mode: Logged in");
      localStorage.setItem("token", "1234");
      return;
    }
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const user: User = data.user;
          dispatch({
            type: "LOGIN",
            payload: { user: user, token: data.token },
          });
          navigate("/");
        });
      } else {
        dispatch({
          type: "LOGIN_FAILED",
        });
        setError("Invalid user credentials");
      }
    });
  };
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="income-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded shadow-lg w-lg">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            inputId="username"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <FormInput
            inputId="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
          {error && <div className="text-red-500">{error}</div>}

          <Button type="submit" variant="primary" disabled={authState.loading}>
            Sign-in
          </Button>
        </form>
      </div>
    </div>
  );
}
