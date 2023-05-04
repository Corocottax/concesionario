import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../redux/users/users.actions";

const NavBar = () => {
  const { user } = useSelector((state) => state.users);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <li>
            <Link to="/postcar">Post Car</Link>
          </li>
        )}
        {user && user.rol === "admin" && (
          <li>
            <Link to="/admin">Pendientes de aprobación</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="#" onClick={logout}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
