import { routes } from "../routes";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../assets/css/header.css";
import DropdownMenu from "../components/DropdownMenu";

export default function Header() {
    return (
        <header className="header">
            <Container fluid>
                <div className="header-content">
                    {/* company logo */}
                    <div className="company-logo">
                        <Link to={routes.homePage}>
                            <img src="/assets/images/company_logo.png" alt="logo" />
                        </Link>
                    </div>

                    {/* searchbar */}
                    <div className="search-bar">
                        <div className="search-input">
                            <img src="/assets/images/search_icon.png" alt="search logo" className="search-icon" />
                            <input
                                type="text"
                                placeholder="Finding question..."
                            />
                        </div>
                    </div>

                    {/* avatar */}
                    <DropdownMenu/>

                </div>
            </Container>
        </header>
    );
}
