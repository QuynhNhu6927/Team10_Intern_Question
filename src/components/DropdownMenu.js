import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/dropdown.css";

export default function DropdownMenu() {
  return (
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle as="div" id="dropdown-custom-components" className="dropdown-toggle-custom">
        {/* User Icon */}
        <div className="avatar-circle">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="dropdown-menu-custom">
        <Dropdown.Item as={Link} to="/profile">Username</Dropdown.Item>
        <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
