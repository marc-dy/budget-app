import { useContext } from "react";
import { AuthContext, AuthDispatchContext } from "../contexts/AuthContext";

export function useAuthState() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
}
