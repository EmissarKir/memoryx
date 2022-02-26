import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavProfile = ({ user }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
      <div
        className="btn dropdown-toggle d-flex align-items-center"
        onClick={toggleMenu}
      >
        <div className="me-2">{user.name}</div>
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${user.name}.svg`}
          alt="user"
          className="img-responsive rounded-circle"
          height="40"
        />
      </div>
      <div className={"dropdown-menu w-100" + (isOpen ? " show" : "")}>
        <Link className="dropdown-item" to={`/users/${user.userId}`}>
          Profile
        </Link>
        <Link className="dropdown-item" to={`/logout`}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
