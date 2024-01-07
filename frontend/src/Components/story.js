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

    const fakeStory = ["In the Arctic's frozen expanse lived a young polar bear named Blizzard, known for his snowy fur and bright eyes. Blizzard loved exploring the icy landscape, marveling at the northern lights, and playing amidst the icebergs. His adventurous spirit was matched only by his curiosity about the world around him.",

    "One day, Blizzard noticed the ice melting unusually fast, threatening his home. Determined to find a solution, he embarked on a journey across the Arctic. Meeting various animals, Blizzard learned about the ecosystem, the impact of climate change, and the importance of his home. These encounters filled him with resolve and ideas to make a difference.",
    
    "Blizzard returned, ready to act. He united the polar bears and other Arctic animals, sharing his newfound knowledge. Together, they worked on conservation efforts, assisting scientists and spreading awareness. Blizzard's story of bravery and cooperation inspired many, turning him into a symbol of hope and a reminder that even small steps can lead to significant change."]

    
    
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
                        <img src="/image/image1.jpg" alt="https://placehold.co/400" />
                        <p>{fakeStory[0]}</p>
                        <p>{storyData.paragraph1}</p>
    
                    </div>
                    <div className="story-part">
                        <div className="audio-div">
                            <button className="btn btn-danger" onClick={handleAudioTwo}>Play Audio</button>
                            <audio className="audioBtn2">
                                <source src="/sound/audio2.mp3"></source>
                            </audio>
                        </div>
                        <img src="/image/image2.jpg" alt="https://placehold.co/400" />
                        <p>{fakeStory[1]}</p>
                        <p>{storyData.paragraph2}</p>
    
                    </div>
                    <div className="story-part">
                        <div className="audio-div">
                            <button className="btn btn-danger" onClick={handleAudioThree}>Play Audio</button>
                            <audio className="audioBtn3">
                                <source src="/sound/audio3.mp3"></source>
                            </audio>
                        </div>
                        <img src="/image/image3.jpg" alt="https://placehold.co/400" />
                        <p>{fakeStory[2]}</p>
                        <p>{storyData.paragraph3}</p>
                    </div>
                </div>
            )}



        </div>

    </div> );
}



export default Story;