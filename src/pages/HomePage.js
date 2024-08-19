import React from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import "../assets/css/HomePage.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div>
            <Header />

            <div className="home-page">
                <div className="btn-fn">
                    <Link to="/add-question"><button >Add Question</button></Link>
                    <Link to="#"><button >My Questions</button></Link>
                </div>
                <div className="items-Question">

                    <Row>
                        <Col xl='2' sm="5" xs='10' className="cards" style={{ backgroundColor: getRandomColor() }}>
                            <Link to="/question-detail" style={{ textDecoration: 'none' }}>
                                <Row className="title" >
                                    <Col >
                                            <p>Question 1</p>
                                    </Col>
                                </Row>
                                <Row className="card-footer">
                                    <Col xl='6' sm='6' xs='6'>
                                        <p>Như Nguyên</p>
                                    </Col>
                                    <Col xl='6' sm='6' xs='6' className="date"><p>dd/mm/yyyy</p></Col>
                                </Row>
                            </Link>
                        </Col>
                        <Col xl='2' sm="5" xs='10' className="cards" style={{ backgroundColor: getRandomColor() }}>
                            <Link to="/question-detail" style={{ textDecoration: 'none' }}>
                                    <Row className="title">
                                        <Col >
                                                <p>Question 1</p>
                                        </Col>
                                    </Row>
                                    <Row className="card-footer">
                                        <Col xl='6' sm='6' xs='6'>
                                            <p>Như Nguyên</p>
                                        </Col>
                                        <Col xl='6' sm='6' xs='6' className="date"><p>dd/mm/yyyy</p></Col>
                                    </Row>
                            </Link>
                        </Col>
                        <Col xl='2' sm="5" xs='10' className="cards" style={{ backgroundColor: getRandomColor() }}>
                            <Link to="/question-detail" style={{ textDecoration: 'none' }}>
                                    <Row className="title">
                                        <Col >
                                                <p>Question 1</p>
                                        </Col>
                                    </Row>
                                    <Row className="card-footer">
                                        <Col xl='6' sm='6' xs='6'>
                                            <p>Như Nguyên</p>
                                        </Col>
                                        <Col xl='6' sm='6' xs='6' className="date"><p>dd/mm/yyyy</p></Col>
                                    </Row>
                                </Link>
                        </Col>
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