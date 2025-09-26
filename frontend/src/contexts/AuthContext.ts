import { createContext } from "react";
import type { AuthAction, AuthState } from "./AuthReducer";

type AuthDispatch = React.Dispatch<AuthAction>;
export const AuthContext = createContext<AuthState | undefined>(undefined);
export const AuthDispatchContext = createContext<AuthDispatch | undefined>(
  undefined
);
