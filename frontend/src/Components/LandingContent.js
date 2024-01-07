import { Link } from "react-router-dom";
import "./styles/LandingContent.css";

const colors = {};

export default function Hero() {
    console.log("in landing content");
    return (
        <div className="landing-content">
            <div className="storytime-text">
                <p className="heading-4">WELCOME TO STORY TIME</p>
                <p className="body-text overline-text">
                    Select a mascot, enter a prompt, and enjoy a special story told from the perspective of your mascot's unique personality.
                </p>

                <div className="storytext-button">
                    <Link to="/StoryTime/characters">
                        <button className="primary-button heading-5">
                            Create New Tale
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
