import { routes } from "../routes";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/questionDetail.css";
import { toast } from "react-toastify";

import { GET_QUESTION_DETAIL, POST_ANSWERS } from "../api/api";
import { GET_ANSWERS_DETAIL_BY_ID_QUESTION } from "../api/api";
import { DELETE_POST } from "../api/api";
import { UPDATE_QUESTION_DETAIL } from "../api/api";
import { DELETE_QUESTION } from "../api/api";




export default function QuestionDetail() {
  const { id } = useParams();
  const [selectedButton, setSelectedButton] = useState("question");
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const answersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedQuestion, setUpdatedQuestion] = useState({
    header: "",
    content: "",
  });

  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  // QuestionDetail component
  const currentUser = JSON.parse(sessionStorage.getItem("selectedUser"));
  const currentUserId = currentUser ? currentUser.id : null;
  const [searchTerm, setSearchTerm] = useState(""); 
  useEffect(() => {
    fetch(GET_QUESTION_DETAIL(id))
      .then((response) => response.json())
      .then((data) => {
        // console.log("Question detail data:", data);
        if (data.length > 0) {
          setQuestion(data[0]);
          setUpdatedQuestion({
            header: data[0].header,
            content: data[0].content,
          });
        }
      })
      .catch((error) =>
        console.error("Error fetching question detail:", error)
      );
  }, [id]);

  useEffect(() => {
    if (selectedButton === "answer") {
      fetch(GET_ANSWERS_DETAIL_BY_ID_QUESTION(id))
        .then((response) => response.json())
        .then((data) => {
          // console.log("Answers detail data:", data);
          setAnswers(data);
        })
        .catch((error) =>
          console.error("Error fetching answers detail:", error)
        );
    }
  }, [selectedButton, id]);

  const totalPages = Math.ceil(answers.length / answersPerPage);
  const currentAnswers = answers.slice(
    (currentPage - 1) * answersPerPage,
    currentPage * answersPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteQuestion = () => {
    if (window.confirm("Bạn có muốn xóa câu hỏi không?")) {
      fetch(DELETE_QUESTION(id), {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Xóa câu hỏi thành công!");
            navigate(routes.homePage); // Điều hướng người dùng về trang chủ
          } else {
            toast.error("Xóa câu hỏi thất bại.");
          }
        })
        .catch((error) => console.error("Error deleting question:", error));
    }
  };

  const handleSaveQuestion = () => {
    if (!updatedQuestion.header.trim()) {
      toast.error("Vui lòng nhập tiêu đề!")
      return;
    }
    if (!updatedQuestion.content.trim()) {
      toast.error("Vui lòng nhập nội dung câu hỏi!")
      return;
    }


    fetch(UPDATE_QUESTION_DETAIL(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...question,
        header: updatedQuestion.header,
        content: updatedQuestion.content,
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Cập nhật câu hỏi thành công !");
          setIsEditing(false);
          setError("");
         
        } else {
          toast.error("Cập nhật câu hỏi thất bại !");
        }
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  // Kiểm tra ID của người dùng hiện tại với ID của tác giả câu hỏi
  const isUserQuestion = question.author_Id === currentUserId;

  // Debugging: Kiểm tra giá trị của currentUserId và question.author_Id
  // console.log("Current User ID:", currentUserId);
  // console.log("Author ID:", question.author_Id);

  return (
    <div>
        <Header onSearch={setSearchTerm} />
      <div className="question-detail">
        <div className="question-button">
          <button
            className={selectedButton === "question" ? "selected" : ""}
            onClick={() => setSelectedButton("question")}
          >
            Question
          </button>
          <button
            className={selectedButton === "answer" ? "selected" : ""}
            onClick={() => setSelectedButton("answer")}
          >
            Answer
          </button>
        </div>

        {selectedButton === "question" && (
          <div className="question-box">
            <div className="question-title">
              <input
                type="text"
                value={updatedQuestion.header}
                onChange={(e) =>
                  setUpdatedQuestion({ ...updatedQuestion, header: e.target.value })
                }
                readOnly={!isUserQuestion || !isEditing}
              />
            </div>

            <div className="question-note">
              {question.user_name} |{" "}
              {new Date(question.createAt).toLocaleDateString()}
            </div>

            <div className="question-content">
              <textarea
                value={updatedQuestion.content}
                onChange={(e) =>
                  setUpdatedQuestion({ ...updatedQuestion, content: e.target.value })
                }
                readOnly={!isUserQuestion || !isEditing}
              />
            </div>
          </div>
        )}

        {selectedButton === "answer" && (
          <div className="answer-box">
            {currentAnswers.map((answer) => (
              <div className="answer" key={answer.id}>
                <div className="answer-note">
                  {`Ngày:  ${new Date(answer.createAt).toLocaleDateString()}`}
                </div>
                <div className="answer-content">{answer.content}</div>
              </div>
            ))}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-button ${currentPage === index + 1 ? "active" : ""
                    }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="update-question-button">
          {isUserQuestion && (
            <>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              ) : (
                <button onClick={handleSaveQuestion}>Save</button>
              )}
              <button onClick={handleDeleteQuestion}>Delete</button>
            </>
          )}
          <Link to={routes.homePage}>
            <button>Cancel</button>
          </Link>
        </div>
        {error && <div className="error-message">{error}</div>} 
      </div>
      <Footer />
    </div>
  );
}
