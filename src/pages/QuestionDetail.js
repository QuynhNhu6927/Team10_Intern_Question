import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/questionDetail.css";

export default function QuestionDetail() {
    const [selectedButton, setSelectedButton] = useState("question");

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

                <div className="question-box">
                    <div className="question-title">Title</div>
                    <div className="question-title">Intern | Date</div>
                    <div className="question-text-amount">text amount</div>
                    <div className="question-content">content</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
