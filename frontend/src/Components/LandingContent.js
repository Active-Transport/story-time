import { Link } from "react-router-dom";
import "./styles/LandingContent.css";

const colors = {};

export default function Hero() {
    console.log("in landing content");
    return (
        <div className="landing-content">
            <p className="heading-4">WELCOME TO STORY TIME</p>
            <div className="storytime-text">
                <p>Follow our colourful characters as they generate & narrate unique stories that are guaranteed to entertain. With a simple prompt, you can unlock boundless creativity.</p>
               

                <div className="storytext-button">
                    <img className="storytext-img" src="/icons/logo_cream.jpg" alt="https://placehold.co/400" />
                    <div className="new-tale-button">
                        <div>
                            <p>Imagine. Create. Captivate.</p>
                            <p>Your story awaits.</p>
                            <br/>
                            <p>Welcome to Story Time </p>
                        </div>
                        <Link to="/StoryTime">
                            <button className="primary-button heading-5">
                                Create New Tale
                            </button>
                        </Link>

                    </div>
                </div>
                <div className="profile-pics-container">
                    <h3> MADE WITH LOVE BY </h3>
                    <div className="profile-pics">

                        <div>
                            <img src="/icons/Yui_icon.png"/>
                            <h2>Yui</h2>
                        </div>
                        <div>
                            <img src="/icons/Trinity_icon.png" />
                            <h2>Trinity</h2>
                        </div>
                        <div>
                            <img src="/icons/Tyler_icon.png" />
                            <h2>Tyler</h2>
                        </div>
                        <div>
                            <img src="/icons/Aniket_icon.png" />
                            <h2>Aniket</h2>
                        </div>
                        <div>
                            <img src="/icons/Kait_icon.png" />
                            <h2>Kait</h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
