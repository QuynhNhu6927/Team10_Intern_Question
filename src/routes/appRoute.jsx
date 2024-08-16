import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from ".";
import { ToastContainer } from "react-toastify";

import HomePage from "../pages/HomePage"
import QuestionDetail from "../pages/QuestionDetail";

//cmt
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default function AppRoute() {
    return (
        <>
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                
                <Route path={routes.homePage} element={<HomePage />} />
                <Route path={routes.questionDetail} element={<QuestionDetail />} />
            </Routes>
        </>
    );
}