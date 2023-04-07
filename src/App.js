import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/id" />;
  };

  console.log(currentUser);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/id"
        element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
