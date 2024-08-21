import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const RequireAdmin = (WrappedComponent) => {
    const WithAdminCheck = (props) => {
        const navigate = useNavigate();
        const [open, setOpen] = useState(false);
        const [isHovered, setIsHovered] = useState(false);

        useEffect(() => {
            const user = JSON.parse(sessionStorage.getItem("selectedUser") || "{}");

            if (user.role !== "admin" || !user) {
                setOpen(true);
            }
        }, [navigate]);

        const handleClose = () => {
            setOpen(false);
            navigate("/"); // Redirect to the homepage
        };

        const buttonStyle = {
            backgroundColor: isHovered ? "#7DACCE" : "#BDE3FF",
            color: 'black',
        };

        return (
            <>
                <WrappedComponent {...props} />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    BackdropProps={{
                        style: { backgroundColor: "rgba(255, 255, 255, 1)" }  // Opaque white background
                    }}
                    PaperProps={{
                        style: { zIndex: 1400 }  // Ensure the dialog is on top
                    }}
                >
                    <DialogTitle 
                    style={{
                        backgroundColor:'#BDE3FF',
                        fontWeight:'bold'
                        }}>Truy cập bị từ chối!</DialogTitle>
                    <DialogContent style={{paddingTop: '10px'}}>
                        Bạn không có quyền truy cập vào trang này!
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={buttonStyle}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleClose}
                            color="primary"
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

    return WithAdminCheck;
};

export default RequireAdmin;
