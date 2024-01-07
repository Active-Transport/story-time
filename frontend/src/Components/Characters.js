import React, { useState } from "react";
import { Button } from "./Button";
import "./styles/Characters.css";

let tones = {
    curiosity: "curiosity 🤔",
    joy: "Happy 🙂",
    love: "love 😍",
    admiration: "admiration 🏆",
    approval: "approval 👍",
    caring: "caring 💝",
    exitement: "exitement 😃",
    amusement: "amusement 😄",
    gratitude: "gratitude ❓",
    desire: "desire ❓",
    anger: "anger 😠",
    optimism: "optimism ❓",
    disapproval: "disapproval 👎",
    grief: "grief 😢",
    annoyance: "annoyance 😩",
    pride: "pride 😏",
    disgust: "disgust 🤮",
    disappointment: "disappointment 😬",
    realization: "realization ?",
    fear: "fear 😨",
    relief: "relief ?",
    confusion: "confusion 🤔",
    remorse: "remose ?",
    embarrassment: "embarrassment 😳",
    surprise: "surprise 😮",
    sadness: "sadness 😭",
    nervousness: "nervousness 😖",
    neutral: "neutral 😑"
};

export default function Toneteller() {
    const [tone, setTone] = useState(null);
    const [print, setPrint] = useState(false);
    const [clickedCharacter, setClickedCharacter] = useState(null);

    const handleCharacterClick = (character) => {
        setClickedCharacter(character);
    };

    const fetchData = () => {
        const inputFieldId = `inputField_${clickedCharacter}`;
        console.log("weee woo", document.getElementById(inputFieldId).value);
        setPrint(true);

        fetch("https://tone-teller-ezen7qibyq-nn.a.run.app/tonetelling", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify({
                input: document.getElementById(inputFieldId).value
            })
        })
            .then((res) => res.json())
            .then((data) => {
                data = data[0];
                setTone(tones[data[0]["label"]]);
            });
    };

    return (
        <div className="toneteller-div">
            <div className="toneteller-text">
                {print ? (
                    <div className="heading-3">Preparing your story...</div>
                ) : (
                    <div className="heading-3">Choose your story</div>
                )}

                {print ? (
                    <div className="body-text">
                        <i>{document.getElementById("inputField").value}</i>
                    </div>
                ) : (
                    <div className="body-text">
                        Select a character and enter a prompt below to generate a unique story.
                    </div>
                )}
            </div>

            <div className="characters-grid">
                <button className="characters-column" onClick={() => handleCharacterClick('character1')}>
                    <div className="characters-img background-blue">
                        <img src="/icons/blizzard.png" alt="https://placehold.co/400" />
                    </div>
                    <p className="heading-6">Blizzard</p>
                </button>

                <button className="characters-column" onClick={() => handleCharacterClick('character2')}>
                    <div className="characters-img background-gold">
                        <img src="/icons/sapphire.png" alt="https://placehold.co/400" />
                    </div>
                    <p className="heading-6">Sapphire</p>
                </button>

                <button className="characters-column" onClick={() => handleCharacterClick('character3')}>
                    <div className="characters-img background-green">
                        <img src="/icons/paprika.png" alt="https://placehold.co/400" />
                    </div>
                    <p className="heading-6">Paprika</p>
                </button>
            </div>


            {clickedCharacter && (
                <div className="toneteller-input-div">
                    <input id="inputField" type="text" onChange={() => { setPrint(false) }} onKeyUp={
                        (e) => {
                            console.log(e.key)
                            if (e.key === 'Enter') {
                                fetchData()
                            }
                        }
                    } />

                    <div className="storytime-input-div">
                        <div className="button-container">

                            <button
                                className="secondary-button heading-5 "
                                onClick={() => fetchData()}
                            >
                                Tell the story
                            </button>


                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}
