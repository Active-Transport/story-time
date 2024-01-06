import { Link } from "react-router-dom";
import "./styles/LandingContent.css";

const colors = {};

export default function Hero() {
    console.log("in landing content")
    return (
        <div className="landing-content">
            <div className="what-is-toneteller-div">
                <p className="overline-text">wELCOME TO STORY TIME</p>
                <p className="heading-5">
                    we have fun stories told by cute AI friends
                </p>
                <p className="body-text">
                    Select a mascot, enter a prompt, and enjoy a special story told from the perspective of your mascot's unique personality~
                </p>

            </div>

            <div className="who-can-use-storytime-div">
                <p className="overline-text">WHO SHOULD READ THE STORIES?</p>
                <p className="heading-5">
                    For ages 1+
                </p>
                <p className="body-text">
                    Cute AI friend's stories are for everyone.
                </p>
            </div>

            <img className="banner" src="/images/banner.png"></img>

            <div className="cta">
                <Link to="/SECOND PAGE">
                    <button className="primary-button heading-5 px-80">
                        Start!
                    </button>
                </Link>
            </div>
        </div>
    );
}
