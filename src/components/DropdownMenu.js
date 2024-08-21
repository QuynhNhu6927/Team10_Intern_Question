import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/dropdown.css";
import { GET_USER_ALL } from "../api/api"; 

export default function DropdownMenu() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(GET_USER_ALL)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("selectedUser"));
    setSelectedUser(user);
  }, []);

  const handleUserClick = (user) => {
    sessionStorage.setItem("selectedUser", JSON.stringify(user));
    if (user.role === "admin") {
      navigate("/");
    } else {
      navigate("/");
    }
    window.location.reload();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("selectedUser");
    navigate("/login");
  };

  return (
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle as="div" id="dropdown-custom-components" className="dropdown-toggle-custom">
        {/* User Icon */}
        <div className="avatar-circle">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" className="dropdown-menu-custom">
        {users.map((user) => (
          <Dropdown.Item
            key={user.id}
            as={Link}
            to="#"
            onClick={() => handleUserClick(user)}
          >
            {user.username}
          </Dropdown.Item>
        ))}
        {selectedUser ? (
          <Dropdown.Item as={Link} to="/logout" onClick={handleLogout}>
            Đăng xuất
          </Dropdown.Item>
        ) : (
          <Dropdown.Item as={Link} to="/login">
            Đăng nhập
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
