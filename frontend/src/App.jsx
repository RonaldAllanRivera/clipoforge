import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <DashboardPage /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="/auth"
          element={
            !isLoggedIn ? <AuthPage /> : <Navigate to="/dashboard" replace />
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/auth"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
