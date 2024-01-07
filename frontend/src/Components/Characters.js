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
                    <div className="heading-3">Analyzing sentiment...</div>
                ) : (
                    <div className="heading-3">Choose your story</div>
                )}
                {print ? (
                    <div className="body-title">Sentiment for prompt: {tone}</div>
                ) : (
                    <div className="body-text">{null}</div>
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
                        <img src="/icons/Polar_Bear.png" alt="https://placehold.co/400" />
                    </div>
                </button>

                <button className="characters-column" onClick={() => handleCharacterClick('character2')}>
                    <div className="characters-img background-gold">
                        <img src="/icons/Flying_bird-rafiki.png" alt="https://placehold.co/400" />
                    </div>
                </button>

                <button className="characters-column" onClick={() => handleCharacterClick('character3')}>
                    <div className="characters-img background-green">
                        <img src="/icons/Dragon-pana.png" alt="https://placehold.co/400" />
                    </div>
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
                    <button
                        className="secondary-button heading-5"
                        onClick={() => fetchData()}
                    />

                    <div className="storytime-input-div">
                        
                        <textarea 
                            className="storytime-input"
                            id={`inputField_${clickedCharacter}`}
                            type="text"
                            onChange={() => setPrint(false)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    fetchData();
                                }
                            }}
                        />

                        <div className="button-container">
                            <img src="/icons/Logo.jpg" alt="https://placehold.co/400" />
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
