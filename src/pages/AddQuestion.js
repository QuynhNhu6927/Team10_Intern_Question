import { routes } from "../routes";
import { Link } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/css/addQuestion.css";

export default function AddQuestion() {

    const titleInputRef = useRef(null);

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    return (
        <div>
            <Header />
            <div className="question-detail">

                <div className="addquestion-box">
                    <div className="addquestion-title">
                        <input
                            type="text"
                            placeholder="Title"
                            ref={titleInputRef}
                        />
                    </div>

                    <div className="question-note">
                        Intern | Date
                    </div>

                    <div className="addquestion-content">
                        <textarea
                            placeholder="Your question here"
                        />
                    </div>
                </div>

                <div className="addquestion-button">
                    <button>
                        Add
                    </button>

                    <Link to={routes.homePage}>
                        <button >
                            Cancel
                        </button>
                    </Link>

                </div>

            </div>
            <Footer />
        </div>
    );
}
