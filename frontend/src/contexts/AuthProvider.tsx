import { useReducer } from "react";
import { authReducer, initialAuthState } from "./AuthReducer";
import { AuthContext, AuthDispatchContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  return (
    <AuthContext value={state}>
      <AuthDispatchContext value={dispatch}>{children}</AuthDispatchContext>
    </AuthContext>
  );
}
