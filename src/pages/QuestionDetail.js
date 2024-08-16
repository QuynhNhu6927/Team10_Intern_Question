import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/questionDetail.css";
import { Col, Pagination, Row } from "react-bootstrap";

export default function QuestionDetail() {
    const [selectedButton, setSelectedButton] = useState("question");

    const [currentPage, setCurrentPage] = useState(1);


    const data = [
        {
            id: 1,
            user: "Tân",
            content: "Content 1",
            date: "16/08/2024",
        },
        {
            id: 2,
            user: "Sơn",
            content: "Content 2",
            date: "16/08/2024",
        },
        {
            id: 3,
            user: "Như",
            content: "Content 3",
            date: "16/08/2024",
        },
        {
            id: 4,
            user: "Mần",
            content: "Content 4",
            date: "16/08/2024",
        },
    ];

    const itemsPerPage = 2;
    const pageCount = Math.ceil(data.length / itemsPerPage);

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
                    <div className="question-title">Title</div>
                    <div className="question-title">Intern | Date</div>
                    <div className="question-text-amount">text amount</div>
                    <div className="question-content">content</div>
                </div>
            )}
              {selectedButton === "answer" && (
                    <div className="answer-box">
                        {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                            <Row key={index}>
                                <Col xl="12" sm="12" xs="12" className="answer-item">
                                    <span>{item.user} </span>
                                    <span className="space">|</span>
                                    <span>{item.date}</span> 
                                    <div className="answer-content">
                                        <p>{item.content}</p>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                        <div className="Pagination">
                        <Pagination>
                            {Array.from({ length: pageCount }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
