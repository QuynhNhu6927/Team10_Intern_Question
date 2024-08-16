import React from "react";
import Header from "../components/Header";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/css/HomePage.css";

export default function HomePage() {
    return (
        <div> 
            <Header/>

            <div> 
                <div className="btn-fn">
                    <button >Add Question</button>
                    <button >My Question</button>
                </div>
                <div className="items-Question">

                    <Row>
                        <Col xl='2' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl='5'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col xl='1'>|</Col>
                                <Col xl='6'>ngày tháng năm</Col>
                            </Row>
                        </Col>
                        <Col xl='2' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl='5'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col xl='1'>|</Col>
                                <Col xl='6'>ngày tháng năm</Col>
                            </Row>
                        </Col>
                        <Col xl='2' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl='5'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col xl='1'>|</Col>
                                <Col xl='6'>ngày tháng năm</Col>
                            </Row>
                        </Col>
                        <Col xl='2' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl='5'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col xl='1'>|</Col>
                                <Col xl='6'>ngày tháng năm</Col>
                            </Row>
                        </Col>
                        <Col xl='2' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl='5'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col xl='1'>|</Col>
                                <Col xl='6'>ngày tháng năm</Col>
                            </Row>
                        </Col>
                        <Col xl='2' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl='5'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col xl='1'>|</Col>
                                <Col xl='6'>ngày tháng năm</Col>
                            </Row>
                        </Col>
                    </Row>

                </div>

            </div>
                
        </div>
    );

    function getRandomColor() {
        const colors = ["#79b7e4", "#5aff5a", "#f7f75f", "#f9ce4d", "#9662f7"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
}