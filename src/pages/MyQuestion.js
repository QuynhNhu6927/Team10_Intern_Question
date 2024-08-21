import React, { useState, useEffect } from "react";
import { routes } from "../routes";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GET_USER_QUESTION } from "../api/api"; // Đảm bảo rằng GET_USER_QUESTION là URL API đúng
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function MyQuestions() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedButton, setSelectedButton] = useState("mine");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("selectedUser"));
    console.log("Selected user from session storage:", user); // Kiểm tra thông tin người dùng
    setSelectedUser(user);

    // Nếu người dùng đã được chọn, gọi API để lấy tất cả các câu hỏi
    if (user) {
      fetch(GET_USER_QUESTION)
        .then((response) => response.json())
        .then((data) => {
          console.log("Posts fetched from API:", data); // Kiểm tra dữ liệu nhận được từ API
          // Lọc các câu hỏi dựa trên ID người dùng
          const userPosts = data.filter((post) => post.author_Id === user.id);
          console.log("Filtered posts for the user:", userPosts); // Kiểm tra các câu hỏi của người dùng
          setPosts(userPosts);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, []);

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
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Col
                  key={post.id}
                  xl="3"
                  sm="6"
                  xs="12"
                  className="cards"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  <Link to={`/question-detail/${post.id}`} style={{textDecoration:'none', color: 'black'}}>
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
                  </Link>
                </Col>
              ))
            ) : (
              <p>Bạn chưa gửi câu hỏi nào</p>
            )}
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
