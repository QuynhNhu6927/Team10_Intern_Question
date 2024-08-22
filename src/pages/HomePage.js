import React, { useState, useEffect } from "react";
import { routes } from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCommentDots} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import "../assets/css/HomePage.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { GET_USER_QUESTION } from "../api/api";

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedButton, setSelectedButton] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("selectedUser"));
    setSelectedUser(user);
  }, []);

  useEffect(() => {
    fetch(GET_USER_QUESTION)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [selectedUser]);

  const handlePostClick = (postId) => {
    if (selectedUser && selectedUser.role === "admin") {
      navigate(`/question-admin/${postId}`);
    } else {
      navigate(`/question-detail/${postId}`);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to the top of the page
  };

  return (
    <div>
      <Header onSearch={setSearchTerm} />

      <div className="home-page">
        {selectedUser && selectedUser.role !== "admin" && (
          <div className="btn-fn">
            <div className="btn-homepage">
              <Link to={routes.homePage}>
                <button
                  className={selectedButton === "all" ? "selected" : ""}
                  onClick={() => setSelectedButton("all")}
                >
                  Tất Cả
                </button>
              </Link>
              <Link to={routes.myquestion}>
                <button
                  className={selectedButton === "mine" ? "selected" : ""}
                  onClick={() => setSelectedButton("mine")}
                >
                  Của Tôi
                </button>
              </Link>
            </div>
            <div className="btn-homepage-add">
              <Link to={routes.addQuestion}>
                <button>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </Link>
            </div>
          </div>
        )}
        <div className="items-Question">
          <Row>
            {currentPosts.map((post) => (
              <Col
                key={post.id}
                xl="2"
                sm="5"
                xs="10"
                className="cards"
                style={{ backgroundColor: getRandomColor() }}
              >
                <div
                  onClick={() => handlePostClick(post.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Row className="title">
                    <Col>
                      <strong>{post.header}</strong>
                      <p style={{fontSize: '10px', marginTop:'30px'}}>{getRandomNumber()} <FontAwesomeIcon icon={faCommentDots}/> </p>
                    </Col>
                  </Row>
                  <Row className="card-footer">
                    <Col xl="6" sm="6" xs="6">
                      <p>{post.full_name || "Unknown Author"}</p>
                    </Col>
                    <Col xl="6" sm="6" xs="6" className="date">
                      <p>{new Date(post.createAt).toLocaleDateString()}</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>

          {/* Circular Pagination */}
          <div className="pagination" style={{marginBottom: '20px'}}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination-button ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );

  function getRandomColor() {
    const colors = [
      "#D5E8D4",
      "#F5F5DC",
      "#B0E0E6",
      "#FFE4E1",
      "#E6E6FA",
      "#FADADD",
      "#FFDAB9",
      "#E2E8E2",
      "#CFE2F3",
      "#FFFDD0",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function getRandomNumber() {
    const numbers = [
      "1",
      "0",
      "13",
      "5",
      "8",
      "9",
      "3",
    ];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  }
}
