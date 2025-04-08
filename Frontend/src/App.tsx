import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserList from "./pages/UserList/UserList";
import useAuth from "./hooks/useAuth";
import PlaceList from "./pages/PlacesList/PlaceList";
import AllowAcess from "./pages/AllowAcess/AllowAcess";

const App = () => {
  const { isLoggedIn, login, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  });

  return (
    <Router>
      <div className="bg-[#FAFAFA] min-h-screen w-screen text-black">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/user-list" />
              ) : (
                <LoginPage login={login} />
              )
            }
          />
          <Route
            path="/user-list"
            element={isLoggedIn ? <UserList /> : <Navigate to="/" />}
          />
          <Route
            path="/place-list"
            element={isLoggedIn ? <PlaceList /> : <Navigate to="/" />}
          />
          <Route
            path="/allow-acess"
            element={isLoggedIn ? <AllowAcess /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
