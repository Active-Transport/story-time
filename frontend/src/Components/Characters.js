import React, { useState } from "react";
import { Button } from "./Button";
import "./styles/Characters.css";
import Story from "./story";
export default function Storytime() {
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
                setClickedCharacter(data);
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
                    <p className="heading-7">playful + curious</p>
                </button>

                <button className="characters-column" onClick={() => handleCharacterClick('character2')}>
                    <div className="characters-img background-gold">
                        <img src="/icons/sapphire.png" alt="https://placehold.co/400" />
                    </div>
                    <p className="heading-6">Sapphire</p>
                    <p className="heading-7">kind + sensitive</p>
                </button>

                <button className="characters-column" onClick={() => handleCharacterClick('character3')}>
                    <div className="characters-img background-green">
                        <img src="/icons/paprika.png" alt="https://placehold.co/400" />
                    </div>
                    <p className="heading-6">Paprika</p>
                    <p className="heading-7">fierce + strong</p>
                </button>
            </div>

            {console.log(clickedCharacter)};
            {clickedCharacter && (
                <Story/>
            )}
        </div>
    );
}
