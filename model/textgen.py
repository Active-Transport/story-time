import os
import re
import replicate

os.environ["REPLICATE_API_TOKEN"] = "r8_bTl0E2JSNdbvBMNDuSRpzCQpV8OpVyc4VPBcr"

# Prompts
pre_prompt = "Tell a dark and gruesome story about"
prompt_input = "baby Yoda"

# Generate LLM response
# Temperature: 0.75, Top P: 0.9, Max Length: 1028, Repetition Penalty: 1
# temperature - is the randomness of the output, 
# top_p - is the probability of the next token being in the top p tokens, 
# max_length - is the maximum length of the output, 
# repetition_penalty - is the penalty for repeating tokens
import replicate

# Prompts
pre_prompt = "Tell a happy and funny story about"
prompt_input = "Mickey Mouse"

# Generate LLM response
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

# Print the paragraphs
for paragraph in new_paragraphs:
  print("Paragraph", paragraph)
  print("\n")