import { routes } from "../routes";
import { Link } from "react-router-dom";
import "../assets/css/header.css";

export default function Header() {
    return (
        <>
            <header>

                {/* company logo */}
                <div className="company-logo">
                    <Link to={routes.homePage}>
                        <img src="#" alt="logo" />
                    </Link>
                </div>

                {/* searchbar */}
                <div className="search-bar">
                    <div className="search-input">
                        <img src="#" alt="search logo" className="search-icon" />
                        <input
                            type="text"
                            placeholder="Finding question..."
                        />

                    </div>
                </div>

                {/* avatar */}
                <div className="avatar">
                    <img src="#" alt="#" />
                </div>
            </header>
        </>
    )
}