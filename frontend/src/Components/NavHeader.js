import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./styles/NavHeader.css";

function NavHeader() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener("resize", showButton);

    return (
        <>
            <nav className="navigation-div">
                <div
                    className={
                        click
                            ? "navigation-content background-yellow"
                            : "navigation-content"
                    }
                >
                    <div className="navigation-title" >
                        <Link to="/" className="heading-4">
                            <h1>Story Time!</h1>
                            </Link>
                    </div>
                    <div className="navigation-right-column">
                    
                        <div
                            onClick={handleClick}
                            className={click ? "navigation-close" : "navigation-menu"}
                        ></div>
                    </div>
                </div>
                <div className={click ? "navigation-mobile" : "display-none"}>
                    <div className="navigation-mobile-links">
                        <Link to="/" className="heading-4" onClick={closeMobileMenu}>
                            Home
                        </Link>

                        <a
                            className="heading-4"
                            target="_blank"
                            href="https://devpost.com/software/story-time-0c51ub"
                        >
                            Devpost
                        </a>

                        <a
                            className="heading-4"
                            target="_blank"
                            href="https://github.com/Active-Transport/story-time"
                        >
                            Github
                        </a>
                    </div>

                    <div className="navigation-mobile-information">
                        <div className="body-text">
                            Created by Active Transport
                        </div>

                        <div className="caption-text">HackED © 2024</div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavHeader;
