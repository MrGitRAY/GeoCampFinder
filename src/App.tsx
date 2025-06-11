import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CampDetailsPage from "./pages/CampDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

// Optional: simple full-page spinner
const FullPageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
    <div className="text-xl animate-pulse">Loading...</div>
  </div>
);

const AppRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) return <FullPageSpinner />;
  return (
    <Routes>
      <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/home/camp-details/:id" element={user ? <CampDetailsPage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <AppRoutes />
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;