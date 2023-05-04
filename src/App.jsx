import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import CarDetail from "./pages/CarDetail/CarDetail";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import PostCar from "./pages/PostCar/PostCar";
import { getAllCars } from "./redux/cars/cars.actions";
import { useEffect } from "react";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { checksession } from "./redux/users/users.actions";

function App() {

  useEffect(() => {
    getAllCars();
    checksession();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CarDetail />} />
        <Route
          path="/admin"
          element={
            <RequireAuth accessAdmin>
              <Admin />
            </RequireAuth>
          }
        />
        <Route
          path="/postcar"
          element={
            <RequireAuth>
              <PostCar />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
