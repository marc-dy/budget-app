import { useContext } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext";

const queryClient = new QueryClient();
function App() {
  const authState = useContext(AuthContext)!;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            {authState.token && <Header />}
            <Routes>
              <Route
                path="/"
                element={
                  authState.loading ? (
                    <div>Loading...</div>
                  ) : authState.token ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/income" element={<Income />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </Router>
        <Toaster position="top-center" reverseOrder={false} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
