import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
