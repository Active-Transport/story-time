import os
from io import BytesIO
import wave
import replicate
import requests
import base64
import elevenlabs
from elevenlabs import set_api_key
from flask import Flask, request, send_file, after_this_request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/receive_input', methods=['POST'])
def receive_input():
    try:
        data = request.json
        prompt = data.get('inputText')

        # Ensure prompt is received
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # Call the function to get the story
        paragraphs = get_text_story(prompt)
        # return jsonify({"response" : paragraphs})
        # Check if paragraphs are successfully retrieved
        
        if isinstance(paragraphs, list) and len(paragraphs) >= 3:
            text_to_speech(paragraphs[0], "../frontend/src/Components/audio1.mp3")
            text_to_speech(paragraphs[1], "audio2.mp3")
            text_to_speech(paragraphs[2], "audio3.mp3")
            return jsonify({
                "paragraph1": paragraphs[0],
                "paragraph2": paragraphs[1],
                "paragraph3": paragraphs[2],
             
            })
        else:
            return jsonify({"error": "Error generating story"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

def get_text_story(prompt):
    try:# trin token2 = r8_do00zo3M6Hpm7jOO3HS5vpJygphadUj13Rwve
        # trin token = r8_Hpd3GignJPpBISMbcXRuMFn2jsT9LbQ4f6uUd
        #  aniket token = r8_bTl0E2JSNdbvBMNDuSRpzCQpV8OpVyc4VPBcr
        #  tyler token = r8_bCD43r2879YnQ8IWXGKaGIi9vJbypfG1IU9Af
        os.environ["REPLICATE_API_TOKEN"] = "r8_Hpd3GignJPpBISMbcXRuMFn2jsT9LbQ4f6uUd"

        pre_prompt = "Tell a a happy and positive story about"

        output = replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
                                input={"prompt": f"{pre_prompt} {prompt}. Divide it into three paragraphs.",
                                "temperature":0.80, "top_p":0.9, "max_length":1028, "repetition_penalty":1})

        
        full_response = "".join(output)

        paragraphs = full_response.split("\n")
        original_paragraphs = paragraphs.copy()
        paragraphs.sort(key=len, reverse=True)
        new_paragraphs = paragraphs[:3]
        new_paragraphs.sort(key=original_paragraphs.index)
        return new_paragraphs
    except Exception as e:
        # Log the exception for debugging
        print("Error:", e)
        return None


# @app.route('/audio', methods=['GET'])
def text_to_speech(paragraphs, filename):
    set_api_key("a8dcd58e5e9377da6afa4f525e89769f")
    
    # get the input from the Body of the request
    # inputText = str(request.get_json()['audio'])
    
    # Assuming ElevenLabs is a class or module with a generate method
    audio_data = elevenlabs.generate(
        text=paragraphs[0],
        voice="N2lVS1w4EtoT3dr4eOWO",
        model="eleven_multilingual_v2"
    )
    
    # save the audio data to a file
    elevenlabs.save(audio_data, filename)
    
    # delete the audio file after sending it
    # @after_this_request
    # def remove_audio(response):
    #     os.remove("audio.mp3")
    #     return response

    # return the audio file as mp3
    # return send_file("audio.mp3", mimetype="audio/mp3")




# @app.route('/image', methods=['GET'])
def image_gen():
    # generate image
    # get the input from the Body of the request
    inputText = str(request.get_json()['prompt'])

    engine_id = "stable-diffusion-v1-6"
    api_host = os.getenv('API_HOST', 'https://api.stability.ai')
    api_key = "sk-xfdigb1KTQ46bzNIZ4olmFNehQV6Pnny1E5lVmHp5h42BveT"

    if api_key is None:
        raise Exception("Missing Stability API key.")

    response = requests.post(
        f"{api_host}/v1/generation/{engine_id}/text-to-image",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        json={
            "text_prompts": [
                {
                    "text": "A lighthouse on a cliff"
                }
            ],
            "cfg_scale": 7,
            "height": 1024,
            "width": 1024,
            "samples": 1,
            "steps": 30,
        },
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    data = response.json()

    # save the image to a file

if __name__ == "__main__":
    app.run(debug=True)