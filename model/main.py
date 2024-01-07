import os
from io import BytesIO
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
        # print (prompt) to the console
        print(prompt)
        # Ensure prompt is received
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # Call the function to get the story
        paragraphs = get_text_story(prompt)
        # return jsonify({"response" : paragraphs})
        # Check if paragraphs are successfully retrieved
        
        if isinstance(paragraphs, list) and len(paragraphs) >= 3:
            text_to_speech(paragraphs[0], "../frontend/public/sound/audio1.mp3")
            text_to_speech(paragraphs[1], "../frontend/public/sound/audio2.mp3")
            text_to_speech(paragraphs[2], "../frontend/public/sound/audio3.mp3")

            return jsonify({
                "paragraph1": paragraphs[0],
                "paragraph2": paragraphs[1],
                "paragraph3": paragraphs[2],
             
            })
        else:
            return jsonify({"error": "Failed to generate paragraphs"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

def get_text_story(pass_prompt):
    try: 
        os.environ["REPLICATE_API_TOKEN"] = "r8_8MVk27pqmXI8F9hCwMEatL8o5idTEzc3QSROI"
        
        pre_prompt = "Tell a happy story about"
        prompt = pass_prompt

        output = replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
                                input={"prompt": f"{pre_prompt} {prompt}. Divide it into three paragraphs.",
                                "temperature":0.60, "top_p":0.9, "max_length":10280, "repetition_penalty":1})

        
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
        return new_paragraphs

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route('/audio', methods=['GET'])
def text_to_speech(paragraphs, filename):
    set_api_key("a8dcd58e5e9377da6afa4f525e89769f")
    
    # get the input from the Body of the request
    # inputText = str(request.get_json()['audio'])
    
    # Assuming ElevenLabs is a class or module with a generate method
    audio_data = elevenlabs.generate(
        text=paragraphs,
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
# def image_gen():
#     input_text = "As they were eating, Mickey noticed a group of ducks waddling by. He had an idea and quickly grabbed a piece of bread from the basket. He started to tease the ducks, waving the bread in the air and making quacking noises. The ducks were so excited that they started to chase Mickey, but he was too fast for them. He ran around in circles, laughing and quacking, until the ducks gave up and waddled away. Mickey and Pluto finished their picnic and headed home, still laughing and having a great time."
#     engine_id = "stable-diffusion-v1-6"
#     api_host = os.getenv('API_HOST', 'https://api.stability.ai')
#     api_key = "sk-xfdigb1KTQ46bzNIZ4olmFNehQV6Pnny1E5lVmHp5h42BveT"

    

#     if api_key is None:
#         raise Exception("Missing Stability API key.")

#     response = requests.post(
#         f"{api_host}/v1/generation/{engine_id}/text-to-image",
#         headers={
#             "Content-Type": "application/json",
#             "Accept": "application/json",
#             "Authorization": f"Bearer {api_key}"
#         },
#         json={
#             "text_prompts": [
#                 {
#                     "text": input_text,
#                 }
#             ],
#             "cfg_scale": 7,
#             "height": 1024,
#             "width": 1024,
#             "samples": 1,
#             "steps": 10,
#         },
#     )

#     if response.status_code != 200:
#         raise Exception("Non-200 response: " + str(response.text))

#     data = response.json()

#     for i, image in enumerate(data["artifacts"]):
#         with open(f"v1_txt2img_{i}.png", "wb") as f:
#             f.write(base64.b64decode(image["base64"]))

#     # return the image so that it can be displayed easily in react
#     return send_file("v1_txt2img_0.png", mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True)