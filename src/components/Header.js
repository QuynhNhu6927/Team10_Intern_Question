import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../assets/css/header.css";
import DropdownMenu from "../components/DropdownMenu";
import { GET_USER_QUESTION } from "../api/api";

export default function Header({ onSearch }) { 
  return (
    <header className="header">
      <Container fluid>
        <div className="header-content">
          {/* company logo */}
          <div className="company-logo">
            <Link to="/">
              <img src="/assets/images/company_logo.png" alt="logo" />
            </Link>
          </div>

          {/* searchbar */}
          <div className="search-bar">
          <div className="search-input">
            <img src="/assets/images/search_icon.png" alt="search logo" className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi"
              onChange={(e) => onSearch(e.target.value)} // Truyền giá trị tìm kiếm lên `HomePage`
            />
          </div>
        </div>

          {/* Dropdown Menu */}
          <DropdownMenu />
        </div>
      </Container>
    </header>
  );
}
