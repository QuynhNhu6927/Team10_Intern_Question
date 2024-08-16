import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/questionDetail.css";

export default function QuestionDetail() {
    const [selectedButton, setSelectedButton] = useState("question");
    const [currentPage, setCurrentPage] = useState(1);
    const answersPerPage = 10;

    const answers = [
        { note: "Admin | Date", detail: "I do not know" },
        { note: "Admin | Date", detail: "Very well" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "I will ask another person" },
        { note: "Admin | Date", detail: "Very well" },
        { note: "Admin | Date", detail: "Very well" },
        { note: "Admin | Date", detail: "Very well" },
        { note: "Admin | Date", detail: "Very well" },
        { note: "Admin | Date", detail: "Very well" },
        { note: "Admin | Date", detail: "I do not know" },
        { note: "Admin | Date", detail: "I do not know" },
        { note: "Admin | Date", detail: "I do not know" },
        { note: "Admin | Date", detail: "I do not know" },
        { note: "Admin | Date", detail: "I do not know" },
        { note: "Admin | Date", detail: "I do not know" },
        { note: "Admin | Date", detail: "I do not know" },
    ];

    const totalPages = Math.ceil(answers.length / answersPerPage);

    const currentAnswers = answers.slice(
        (currentPage - 1) * answersPerPage,
        currentPage * answersPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Header />
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
                        <div className="question-title" style={{fontWeight:'bold'}}>Title</div>
                        <div className="question-title">Intern | Date</div>
                        <div className="question-text-amount">text amount</div>
                        <div className="question-content">content</div>
                    </div>
                )}

                {selectedButton === "answer" && (
                    <div className="answer-box">
                        {currentAnswers.map((answer, index) => (
                            <div className="answer" key={index}>
                                <div className="answer-note">{answer.note}</div>
                                <div className="answer-detail">{answer.detail}</div>
                            </div>
                        ))}
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`pagination-button ${
                                        currentPage === index + 1 ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
