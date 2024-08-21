import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Footer() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 90) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <footer
            style={{
                backgroundColor: '#BDE3FF',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px 0 20px 0'
            }}>
            <div>
                <div className="company-logo"
                    style={{
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>
                <div className="company-logo">
                    © 2023 Amazing Tech. All Rights Reserved.
                </div>
            </div>
            <div
                style={{
                    position: 'fixed',
                    right: '0px',
                    bottom: '0px',
                    fontSize: '30px',
                    backgroundColor: '#7DACCE',
                    height: '35px',
                    width: '30px',
                    display: showButton ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
            >
                <FontAwesomeIcon
                    icon={faAngleUp}
                    onClick={handleScrollToTop} >
                </FontAwesomeIcon>
            </div>
        </footer>
    );
}
