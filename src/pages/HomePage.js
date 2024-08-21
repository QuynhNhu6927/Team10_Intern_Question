import React, { useState, useEffect } from "react";
import { routes } from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state để quản lý từ khóa tìm kiếm
  const [selectedButton, setSelectedButton] = useState("all");

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

  // Lọc bài viết dựa trên từ khóa tìm kiếm
  const filteredPosts = posts.filter((post) =>
    post.header.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div div className="btn-homepage-add">
              <Link to={routes.addQuestion} >
                <button><FontAwesomeIcon icon={faPlus} /></button>
              </Link>
            </div>
          </div>
        )}
        <div className="items-Question">
          <Row>
            {filteredPosts.map((post) => (
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
        </div>
      </div>

      <Footer />
    </div>
  );

  function getRandomColor() {
    const colors = ["#79b7e4", "#5aff5a", "#f7f75f", "#f9ce4d", "#9662f7"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}
