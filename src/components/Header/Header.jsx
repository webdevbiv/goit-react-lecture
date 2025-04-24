import { useContext } from "react";
import { AuthContext } from "../../providers/authProvider";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

import s from "./Header.module.scss";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div>
      <nav>
        <NavLink className={setActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={setActiveClass} to="/about">
          About
        </NavLink>
        <NavLink className={setActiveClass} to="/users">
          Users
        </NavLink>
      </nav>
      <h1>Header</h1>
      <h2>{user}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;
