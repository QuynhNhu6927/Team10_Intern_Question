import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from ".";
import { ToastContainer } from "react-toastify";

import HomePage from "../pages/HomePage"

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
            </Routes>
        </>
    );
}