import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../assets/css/dropdown.css";
import { routes } from "../routes";

export default function DropdownMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
  };

  return (
    <Dropdown
      onToggle={() => setShowMenu((prevShowMenu) => !prevShowMenu)}
      show={showMenu}>
      <Dropdown.Toggle id="dropdown-basic">
        <i className="fa-solid fa-user"></i>
      </Dropdown.Toggle>

      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames="dropdown-menu"
        unmountOnExit>
        <Dropdown.Menu className="dropdown-menu">
          <Link
            onClick={handleProfileClick}
            style={{
              textDecoration: "none",
              width: "inherit",
              color: "black",
            }}>
            <Dropdown.Item>UserName</Dropdown.Item>
          </Link>

          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}>
            <Dropdown.Item>Logout</Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </CSSTransition>
    </Dropdown>
  );
}
