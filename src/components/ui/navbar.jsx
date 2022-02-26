import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="navbar navbar-ligth bg-ligth mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" to="/" exact>
              Главная
            </NavLink>
          </li>
          {currentUser && (
            <li className="nav-item">
              <NavLink
                className="nav-link "
                aria-current="page"
                to="/testslist"
                exact
              >
                Список тестов
              </NavLink>
            </li>
          )}
        </ul>

        <div className="d-flex">
          {currentUser ? (
            <NavProfile user={currentUser} />
          ) : (
            <NavLink className="nav-link " aria-current="page" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
