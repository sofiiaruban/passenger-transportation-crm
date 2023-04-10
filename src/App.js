import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import UserCard from "./components/UserCard";
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
        path="/userprofile"
        element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        }
      />
      <Route
        path="/user"
        element={
          <RequireAuth>
            <UserCard />
          </RequireAuth>
        }
      />
      <Route
        path="/user/:id"
        element={
          <RequireAuth>
            <UserCard editMode={true} />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
