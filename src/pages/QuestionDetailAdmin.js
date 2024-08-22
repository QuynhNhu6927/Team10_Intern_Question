import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faTrash, faFileText, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/questionDetail.css";
import "../assets/css/questionDetailAdmin.css";
import { toast } from "react-toastify";
import { routes } from "../routes";
import { GET_QUESTION_DETAIL, POST_ANSWERS } from "../api/api";
import { GET_ANSWERS_DETAIL_BY_ID_QUESTION } from "../api/api";
import { DELETE_POST } from "../api/api";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

export default function QuestionDetailAdmin() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [selectedButton, setSelectedButton] = useState("question");
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const answersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [authorId, setAuthorId] = useState(3);
  const [postId, setPostId] = useState(id);
  const [open, setOpen] = useState(false);

  const handleAddAnswer = async () => {
    if (answerContent.trim() === "") {
      toast.error("Vui lòng trả lời trước khi gửi !");
      return;
    }

    try {
      const response = await axios.post(POST_ANSWERS, {
        content: answerContent,
        createAt: new Date().toISOString(),
        post: {
          id: postId,
        },
        author: {
          id: authorId,
        },
      });

      const newAnswer = {
        content: answerContent,
        createAt: new Date().toISOString(),
      };

      setAnswers((prevAnswers) => [newAnswer, ...prevAnswers]);
      setAnswerContent("");
      toast.success("Thêm câu trả lời thành công!");

    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(DELETE_POST(id));
      if (response.status === 200) {
        toast.success("Xóa câu hỏi thành công!");
        navigate(routes.homePage);
      } else {
        toast.error("Lỗi khi xóa câu hỏi.");
      }
    } catch (error) {
      toast.error("Lỗi khi xóa câu hỏi.");
      console.error("Error deleting post:", error);
    } finally {
      setOpen(false);
    }
  };
  useEffect(() => {
    fetch(GET_QUESTION_DETAIL(id))
      .then((response) => response.json())
      .then((data) => {
        console.log("Question detail data:", data);
        if (data.length > 0) {
          setQuestion(data[0]);
        }
      })
      .catch((error) =>
        console.error("Error fetching question detail:", error)
      );
  }, [id]);

  useEffect(() => {
    // Fetch answers details if the button "answer" is selected
    if (selectedButton === "answer") {
      fetch(GET_ANSWERS_DETAIL_BY_ID_QUESTION(id))
        .then((response) => response.json())
        .then((data) => {
          console.log("Answers detail data:", data);
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

  if (!question) {
    return <div>Loading...</div>;
  }

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
            <div className="question-title" style={{ fontWeight: "bold" }}>
              {question.header}
            </div>
            <div className="question-title">
              {question.full_name} |{" "}
              {new Date(question.createAt).toLocaleDateString()}
            </div>

            <div className="question-content"><textarea value={question.content} /></div>
          </div>
        )}

        {selectedButton === "answer" && (
          <div className="answer-box">
            <div className="answer-add-box">
              <div className="answer-add">
                <textarea
                  placeholder="Nhập câu trả lời"
                  rows="4"
                  className="answer-note-input"
                  value={answerContent}
                  onChange={(e) => setAnswerContent(e.target.value)}
                />
              </div>
              <button className="answer-add-button" onClick={handleAddAnswer}>
                <FontAwesomeIcon icon={faPaperPlane} className="answer-icon" />
              </button>
            </div>
            {currentAnswers.map((answer, index) => (
              <div className="answer" key={index}>
                <div className="answer-note">
                  {" "}
                  {`Ngày: ${new Date(answer.createAt).toLocaleDateString()}`}
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
        <div className="update-question-button">
          <Button
            style={{
              color: 'black',
              width: '45px',
              height: '45px',
              border: '2px solid #7DACCE',
              borderRadius: '50px',
              transition: 'opacity 0.3s, visibility 0.3s'
            }}
            variant="contained"
            onClick={handleClickOpen}
            sx={{ textTransform: 'none' }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{
              backgroundColor: '#BDE3FF',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
            }}>
              {"Xác nhận xóa câu hỏi"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"
                style={{ paddingTop: '10px', color: 'black' }}>
                Hành động này không thể hoàn tác!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}
                style={{
                  backgroundColor: "#BDE3FF",
                  color: "black",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#7DACCE")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#BDE3FF")}>
                Hủy
              </Button>
              <Button onClick={handleDeletePost} style={{
                backgroundColor: "#BDE3FF",
                color: "black",
              }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#7DACCE")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#BDE3FF")}>
                Xóa
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Footer />
    </div >
  );
}
