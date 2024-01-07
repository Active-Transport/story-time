import "./styles/story.css"
import {Howl} from 'howler'
import React, { useState, useEffect } from 'react';


const Story = () => {
    const [inputText, setInputText] = useState('');
    const [storyData, setStoryData] = useState('');
    const [audio, setAudio] = useState('');

    // STORY GENERATION AND FORM
    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputText })
        };

        // Replace URL with your Flask server endpoint
        const response = await fetch('http://127.0.0.1:5000/receive_input', requestOptions);
        const data = await response.json();
        setStoryData(data);
        console.log(data);
    };



    
    // AUDIO GENERATION 
    // const handAudioClick = async (event) => {
    //     event.preventDefault();
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ storyData })
    //     };

    //     // Replace URL with your Flask server endpoint
    //     const response = await fetch('http://127.0.0.1:5000/audio', requestOptions);
    //     const data = await response.json();
    //     setAudio(data);
    //     console.log(data);
    // };
    
    const handleAudioOne = () => {
        const audio = new Audio("frontend/src/Components/audio1.mp3")
        audio.play();
    };
     
    const handleAudioTwo = () => {
        const audio = new Audio("/frontend/audio1.mp3");
        audio.play();
    }
    
     
    const handleAudioThree = () => {
        const audio = new Audio("/backend/audio1.mp3");
        audio.play();
    }

    const audioClip = { sound: "http://soundbible.com/mp3/Upper Cut-SoundBible.com-1272257235.mp3", label: "upper cut" };
    const playSound = (src) => {
        const sound = new Howl({
            src,
            html5: true // Allows the audio to play in mobile devices
        });

        sound.play();
    };

    return (
        <div className="Story-container">
            <div className="toneteller-input-div">
                <form className="toneteller-input-div" onSubmit={handleSubmit}>
                    <input 
                        
                        type="text" 
                        value={inputText} 
                        onChange={e => setInputText(e.target.value)} 
                    />
                    <button 
                    className="secondary-button heading-5"
                    type="submit">Generate Story</button>
                </form>
            </div>
            <button onClick={() => handleAudioOne()}>Audio Button</button>

            <div>
            {storyData && (
                <div>
                    


                    <div className="story-part">
                        <div className="audio-div">
                            <h2>Listen along to the story!</h2>
                            <button onClick={() => handleAudioOne()}>Audio Button</button>
                        </div>
                        <img src="/icons/logo_cream.jpg" alt="https://placehold.co/400" />
                        <p>{storyData.paragraph1}</p>
    
                    </div>
                    <div className="story-part">
                        <div className="audio-div">
                            <h2>Listen along to the story!</h2>
                            <button onClick={() => handleAudioTwo()}>Audio Button</button>
                        </div>
                        <img src="/icons/logo_cream.jpg" alt="https://placehold.co/400" />
                        <p>{storyData.paragraph2}</p>
    
                    </div>
                    <div className="story-part">
                        <div className="audio-div">
                            <h2>Listen along to the story!</h2>
                            <button onClick={() => handleAudioThree()}>Audio Button</button>
                        </div>
                        <img src="/icons/logo_cream.jpg" alt="https://placehold.co/400" />
                        <p>{storyData.paragraph3}</p>
    
                    </div>
                </div>
            )}



        </div>

    </div> );
}



export default Story;