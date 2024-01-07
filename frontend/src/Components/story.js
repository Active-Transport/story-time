import "./styles/story.css"
import {Howl} from 'howler'
import React, { useState, useEffect, useRef } from 'react';


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
        const targetAudio = document.getElementsByClassName("audioBtn1")[0];
        targetAudio.play();
    };
     
    const handleAudioTwo = () => {
        const targetAudio = document.getElementsByClassName("audioBtn2")[0];
        targetAudio.play();
    };
    
     
    const handleAudioThree = () => {
        const targetAudio = document.getElementsByClassName("audioBtn3")[0];
        targetAudio.play();
    };

    const audioClip = { sound: "http://soundbible.com/mp3/Upper Cut-SoundBible.com-1272257235.mp3", label: "upper cut" };
    const playSound = (src) => {
        const sound = new Howl({
            src,
            html5: true // Allows the audio to play in mobile devices
        });

        sound.play();
    };

    let initAudio = () => {
        const targetAudio = document.getElementsByClassName("audioBtn1")[0];
        targetAudio.play();
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
            

            <div>
            {storyData && (
                <div>
                    


                    <div className="story-part">
                        <div className="audio-div">
                            <button className="btn btn-danger" onClick={handleAudioOne}>Play Audio</button>
                            <audio className="audioBtn1">
                                <source src="/sound/audio1.mp3"></source>
                            </audio>
                        </div>
                        <img src="/icons/logo_cream.jpg" alt="https://placehold.co/400" />
                        <p>{storyData.paragraph1}</p>
    
                    </div>
                    <div className="story-part">
                        <div className="audio-div">
                            <button className="btn btn-danger" onClick={handleAudioTwo}>Play Audio</button>
                            <audio className="audioBtn2">
                                <source src="/sound/audio2.mp3"></source>
                            </audio>
                        </div>
                        <img src="/icons/logo_cream.jpg" alt="https://placehold.co/400" />
                        <p>{storyData.paragraph2}</p>
    
                    </div>
                    <div className="story-part">
                        <div className="audio-div">
                            <button className="btn btn-danger" onClick={handleAudioThree}>Play Audio</button>
                            <audio className="audioBtn3">
                                <source src="/sound/audio3.mp3"></source>
                            </audio>
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