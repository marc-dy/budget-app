import { render } from "@testing-library/react";
import { AuthProvider } from "../../src/contexts/AuthProvider";
import { AuthContext } from "../../src/contexts/AuthContext";

describe("AuthProvider", () => {
  it("initializes with no user", () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            expect(value!.token).toBeNull();
            expect(value!.loading).toBeFalsy();
            expect(value!.user).toBeNull();
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  });
});
