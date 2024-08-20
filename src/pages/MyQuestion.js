import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET_USER_QUESTION } from "../api/api"; // Đảm bảo rằng GET_USER_QUESTION là URL API đúng
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function MyQuestions() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

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
            <Link to="/add-question">
              <button>Add Question</button>
            </Link>
            <Link to="/my-questions">
              <button>My Questions</button>
            </Link>
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
                  <Link to={`/question-detail/${post.id}`}>
                    <Row className="title">
                      <Col>
                        <p>{post.header}</p>
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
              <p>No questions available.</p>
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
