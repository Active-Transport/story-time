import os
from io import BytesIO
import wave
import replicate
import elevenlabs
import base64
import requests
from elevenlabs import set_api_key
from flask import Flask, request, send_file, after_this_request

app = Flask(__name__)

@app.route('/text', methods=['GET'])
def get_text_story():
    os.environ["REPLICATE_API_TOKEN"] = "r8_bCD43r2879YnQ8IWXGKaGIi9vJbypfG1IU9Af"

    # Prompts
    pre_prompt = "Tell a dark and gruesome story about"
    # get the input from the Body of the request

    prompt_input = str(request.get_json()['text'])
    print(prompt_input)

    # Generate LLM response
    # Temperature: 0.75, Top P: 0.9, Max Length: 1028, Repetition Penalty: 1
    # temperature - is the randomness of the output, 
    # top_p - is the probability of the next token being in the top p tokens, 
    # max_length - is the maximum length of the output, 
    # repetition_penalty - is the penalty for repeating tokens

    output = replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', # LLM model
                            input={"prompt": f"{pre_prompt} {prompt_input}. Divide it into three paragraphs.", # Prompts
                            "temperature":0.80, "top_p":0.9, "max_length":1028, "repetition_penalty":1})  # Model parameters
    
    # Converting the output to string
    full_response = ""
    for item in output:
        full_response += item

    # print(full_response)
    # print("\n")
    # Splitting the response into paragraphs based on the spaces and selecting the three entries biggest size
    paragraphs = full_response.split("\n")
    original_paragraphs = paragraphs.copy()
    paragraphs.sort(key=len, reverse=True)
    new_paragraphs = paragraphs[:3]
    # sort the paragraphs by their original order before sorting by length
    new_paragraphs.sort(key=original_paragraphs.index)

    # Return the paragraphs, json format
    return {
        "paragraph1": new_paragraphs[0],
        "paragraph2": new_paragraphs[1],
        "paragraph3": new_paragraphs[2]
    }

@app.route('/audio', methods=['GET'])
def text_to_speech():
    set_api_key("a8dcd58e5e9377da6afa4f525e89769f")
    
    # get the input from the Body of the request
    inputText = str(request.get_json()['audio'])
    
    # Assuming ElevenLabs is a class or module with a generate method
    audio_data = elevenlabs.generate(
        text=inputText,
        voice="N2lVS1w4EtoT3dr4eOWO",
        model="eleven_multilingual_v2"
    )
    # save the audio data to a file
    elevenlabs.save(audio_data, "audio.mp3")
    
    # delete the audio file after sending it
    # @after_this_request
    # def remove_audio(response):
    #     os.remove("audio.mp3")
    #     return response

    # return the audio file as mp3
    return send_file("audio.mp3", mimetype="audio/mp3")

@app.route('/image', methods=['GET'])
def image_gen():
    # generate image
    # get the input from the Body of the request
    inputText = str(request.get_json()['prompt'])

    engine_id = "stable-diffusion-v1-6"
    api_host = os.getenv('API_HOST', 'https://api.stability.ai')
    api_key = os.getenv("STABILITY_API_KEY")

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

    for i, image in enumerate(data["artifacts"]):
        with open(f"./out/v1_txt2img_{i}.png", "wb") as f:
            f.write(base64.b64decode(image["base64"]))
