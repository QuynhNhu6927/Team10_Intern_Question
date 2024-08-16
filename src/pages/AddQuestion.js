import { routes } from "../routes";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/addQuestion.css";

export default function AddQuestion() {
    return (
        <div>
            <Header />
            <div className="question-detail">

                <div className="addquestion-box">
                    <div className="question-title">Title</div>
                    <div className="question-title">Intern | Date</div>
                    <div className="question-text-amount">text amount</div>
                    <div className="question-content">content</div>
                </div>
                <div className="addquestion-button">
                    <button>
                        Add
                    </button>
                    <button >
                        <Link to={routes.homePage}>
                            Cancel
                        </Link>
                    </button>
                </div>

            </div>
            <Footer />
        </div>
    );
}
