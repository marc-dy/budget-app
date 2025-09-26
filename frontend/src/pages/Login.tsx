// import FormInput from "../components/common/FormInput";
// import { useState } from "react";
// import Button from "../components/common/Button";
// import { useAuthDispatch, useAuthState } from "../hooks/useAuth";
// import type { User } from "../types/User";
// import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
export default function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const dispatch = useAuthDispatch();
  // const authState = useAuthState();
  // const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   dispatch({ type: "LOGIN_START" });
  //   e.preventDefault();

  //   /* istanbul ignore if -- @preserve */
  //   if (import.meta.env.DEV) {
  //     console.log("Development mode: Logged in");
  //     localStorage.setItem("token", "1234");
  //     return;
  //   }
  //   fetch("/api/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username, password }),
  //   }).then((response) => {
  //     if (response.ok) {
  //       response.json().then((data) => {
  //         const user: User = data.user;
  //         dispatch({
  //           type: "LOGIN",
  //           payload: { user: user, token: data.token },
  //         });
  //         navigate("/");
  //       });
  //     } else {
  //       dispatch({
  //         type: "LOGIN_FAILED",
  //       });
  //       setError("Invalid user credentials");
  //     }
  //   });
  // };

  return <LoginModal />;
}
