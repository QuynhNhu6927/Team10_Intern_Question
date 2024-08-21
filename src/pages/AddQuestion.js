import { routes } from "../routes";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/addQuestion.css";
import { API_ADD_QUESTION } from "../api/api";
import { toast } from "react-toastify";
export default function AddQuestion() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const titleInputRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("selectedUser"));
    setUser(storedUser);

    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleAddQuestion = () => {
    // Kiểm tra dữ liệu trước khi gửi
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề!");
      return;
    }
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung!");
      return;
    }

    // Tạo đối tượng câu hỏi
    const newPost = {
      header: title,
      content: content,
      createAt: new Date().toISOString().split("T")[0], // Định dạng ngày theo YYYY-MM-DD
      author: {
        id: user ? user.id : null, // ID người dùng
      },
    };

    // Gửi yêu cầu POST tới API
    fetch(API_ADD_QUESTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Thêm câu hỏi thành công!");
        navigate(routes.homePage); 
      })
      .catch((error) => {
        console.error("Error adding question:", error);
        toast.error("Thêm câu hỏi thất bại!");
      });
  };

  return (
    <div>
        <Header onSearch={setSearchTerm} />
      <div className="question-detail">
        <div className="addquestion-box">
          <div className="addquestion-title">
            <input
              type="text"
              placeholder="Tiêu đề"
              ref={titleInputRef}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(""); // Xóa lỗi khi người dùng thay đổi
              }}
            />
          </div>

          <div className="question-note">
            {user
              ? `${user.fullName} | ${new Date().toLocaleDateString()}`
              : "Loading..."}
          </div>

          <div className="addquestion-content">
            <textarea
              placeholder="Câu hỏi của bạn"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(""); // Xóa lỗi khi người dùng thay đổi
              }}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Hiển thị thông báo lỗi */}
        <div className="addquestion-button">
          <button onClick={handleAddQuestion}>Thêm</button>

          <Link to={routes.homePage}>
            <button>Hủy</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
