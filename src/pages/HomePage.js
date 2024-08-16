import React from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
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
                        <Col xl='2' sm="5" xs='10' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row className="card-footer">
                                <Col xl='6' sm='6' xs='6'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col>|</Col>
                                <Col xl='4' sm='4' xs='4'>dd/mm/yy</Col>
                            </Row>
                        </Col>
                        <Col xl='2' sm="5" xs='10' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row className="card-footer">
                                <Col xl='6' sm='6' xs='6'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col>|</Col>
                                <Col xl='4' sm='4' xs='4'>dd/mm/yy</Col>
                            </Row>
                        </Col>
                        <Col xl='2' sm="5" xs='10' className="cards" style={{backgroundColor: getRandomColor()}}>
                            <Row className="title">
                                <Col >
                                    <p>Question 1</p>
                                </Col>
                            </Row>
                            <Row className="card-footer">
                                <Col xl='6' sm='6' xs='6'>
                                    <p>Như Nguyên</p>
                                </Col>
                                <Col>|</Col>
                                <Col xl='4' sm='4' xs='4'>dd/mm/yy</Col>
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