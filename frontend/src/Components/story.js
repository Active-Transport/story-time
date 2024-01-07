import "./styles/story.css"
import {Howl} from 'howler'
import React, { useState, useEffect } from 'react';


const Story = () => {

    // TEXT THINGS 
    const [text, setText] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/get_story')
            .then(response => response.json())
            .then(data => setText(data.paragraph))
            .catch(error => console.error('Error:', error));
    }, []);

    const storyData = [
        "Mickey Mouse was feeling very happy and playful one sunny day. He decided to have a picnic in the park with his best friend, Pluto. They packed a basket with sandwiches, fruit, and cookies, and set off to find a nice spot to eat. As they were walking, Mickey saw a little girl playing with a ball and he couldn't resist joining in on the fun. He chased after the ball and started to play a game of catch with the girl.",
        "Pluto was having a great time watching Mickey and the little girl play. He was laughing and barking, and wagging his tail so hard it was wagging his whole body. The little girl was thrilled to have Mickey Mouse playing with her, and she giggled and squealed with delight. Mickey and the little girl played for a while, until they were all hot and sweaty. Then, they decided to take a break and sit down in the shade to eat their picnic lunch.",
        "As they were eating, Mickey noticed a group of ducks waddling by. He had an idea and quickly grabbed a piece of bread from the basket. He started to tease the ducks, waving the bread in the air and making quacking noises. The ducks were so excited that they started to chase Mickey, but he was too fast for them. He ran around in circles, laughing and quacking, until the ducks gave up and waddled away. Mickey and Pluto finished their picnic and headed home, still laughing and having a great time."
    ];



    // AUDIO THINGS
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
            <div className="audio-div">
                <h2>Listen along to the story!</h2>
                <button onClick={() => playSound(audioClip.sound)}>Audio Button</button>
            </div>
        
        {storyData.map((paragraph, index) => (
            <div key={index} className="story-part">
                <img src="/icons/logo_cream.jpg" alt="https://placehold.co/400" />
                <p>{paragraph}</p>
            </div>
        ))}

    </div> );
}



export default Story;