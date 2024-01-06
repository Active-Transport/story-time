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
output = replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', # LLM model
                        input={"prompt": f"{pre_prompt} {prompt_input}. Divide it into three paragraphs. Output Format should be P1: write the generated paragraph one here; P2: write the generated paragraph two here; P3: Write the generated paragraph 3 here;", # Prompts
                        "temperature":0.75, "top_p":0.9, "max_length":1028, "repetition_penalty":1})  # Model parameters
     
# Converting the output to string
full_response = ""
for item in output:
  full_response += item

# Regex to extract the three paragraphs individually
p1 = re.search(r'P1:(.*)P2:', full_response, re.DOTALL)
p2 = re.search(r'P2:(.*)P3:', full_response, re.DOTALL)
p3 = re.search(r'P3:(.*)', full_response, re.DOTALL)

# Printing the three paragraphs
print("Paragraph 1: ", p1.group(1))
print("Paragraph 2: ", p2.group(1))
print("Paragraph 3: ", p3.group(1))
