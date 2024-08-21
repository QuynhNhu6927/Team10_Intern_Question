import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAdmin = (WrappedComponent) => {
    const WithAdminCheck = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const user = JSON.parse(sessionStorage.getItem("selectedUser") || "{}");

            if (user.role !== "admin" || !user) {
                alert("Bạn không có quyền truy cập vào trang này.");
                navigate("/");
                return;
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };

    return WithAdminCheck;
};

export default RequireAdmin;
