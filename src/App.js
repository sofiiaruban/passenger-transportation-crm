import "./App.css";
import { Routes, Route } from "react-router-dom";
import CardComponent from "./components/CardComponent";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CardComponent />} />
      <Route path="/id" element={<UserProfile />} />
    </Routes>
  );
};

export default App;
