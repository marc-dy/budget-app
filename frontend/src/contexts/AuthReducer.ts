import type { User } from "../types/User";

export type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

export const initialAuthState = {
  user: null,
  token: null,
  loading: false,
};

export type AuthAction =
  | { type: "LOGIN_START" }
  | {
      type: "LOGIN";
      payload: { user: User; token: string };
    }
  | {
      type: "LOGIN_FAILED";
    }
  | { type: "LOGOUT" };

export function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true };
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGIN_FAILED":
      return { ...state, loading: false };
    case "LOGOUT":
      return initialAuthState;
    default:
      return state;
  }
}
