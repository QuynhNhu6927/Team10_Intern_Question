import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave, faArrowCircleLeft, faFileText, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/questionDetail.css";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  GET_QUESTION_DETAIL,
  POST_ANSWERS,
  DELETE_QUESTION,
  UPDATE_QUESTION_DETAIL,
  GET_ANSWERS_DETAIL_BY_ID_QUESTION
} from "../api/api";
import { routes } from "../routes";

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
  const [openDialog, setOpenDialog] = useState(false); // State to control Dialog visibility
  const navigate = useNavigate();

  // QuestionDetail component
  const currentUser = JSON.parse(sessionStorage.getItem("selectedUser"));
  const currentUserId = currentUser ? currentUser.id : null;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(GET_QUESTION_DETAIL(id))
      .then((response) => response.json())
      .then((data) => {
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
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to the top of the page
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    fetch(DELETE_QUESTION(id), {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Xóa câu hỏi thành công!");
          navigate(routes.homePage);
        } else {
          toast.error("Xóa câu hỏi thất bại.");
        }
      })
      .catch((error) => console.error("Error deleting question:", error))
      .finally(() => handleCloseDialog());
  };

  const handleSaveQuestion = () => {
    if (!updatedQuestion.header.trim()) {
      toast.error("Vui lòng nhập tiêu đề!");
      return;
    }
    if (!updatedQuestion.content.trim()) {
      toast.error("Vui lòng nhập nội dung câu hỏi!");
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
          toast.success("Cập nhật câu hỏi thành công!");
          setIsEditing(false);
          setError("");
        } else {
          toast.error("Cập nhật câu hỏi thất bại!");
        }
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  // Kiểm tra ID của người dùng hiện tại với ID của tác giả câu hỏi
  const isUserQuestion = question.author_Id === currentUserId;

  return (
    <div>
      <Header onSearch={setSearchTerm} />
      <div className="question-detail">
        <div className="question-button">
          <button
            className={selectedButton === "question" ? "selected" : ""}
            onClick={() => setSelectedButton("question")}
          >
            <FontAwesomeIcon icon={faFileText} />
          </button>
          <button
            className={selectedButton === "answer" ? "selected" : ""}
            onClick={() => setSelectedButton("answer")}
          >
            <FontAwesomeIcon icon={faCommentDots} />
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
                <div className="answer-detail">{answer.content}</div>
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
        <div className="update-question-button-icon">
          {isUserQuestion && (
            <>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faEdit} /></button>
              ) : (
                <button onClick={handleSaveQuestion}><FontAwesomeIcon icon={faSave} /></button>
              )}
              <button onClick={handleOpenDialog}><FontAwesomeIcon icon={faTrash} /></button>
            </>
          )}
          <Link to={routes.homePage}>
            <button><FontAwesomeIcon icon={faArrowCircleLeft} /></button>
          </Link>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <Footer />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.8)"
          },
        }}
      >
        <DialogTitle
          style={{
            backgroundColor: '#BDE3FF',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Xác nhận xóa câu hỏi
        </DialogTitle>
        <DialogContent
          style={{ paddingTop: '10px' }}
        >
          Hành động này không thể hoàn tác!
        </DialogContent>
        <DialogActions
          style={{ color: "black" }}>
          <Button
            onClick={handleCloseDialog}
            style={{
              backgroundColor: "#BDE3FF",
              color: "black",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#7DACCE")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#BDE3FF")}>
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{
              backgroundColor: "#BDE3FF",
              color: "black",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#7DACCE")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#BDE3FF")}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
