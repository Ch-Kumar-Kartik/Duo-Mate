import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import PeftModel
from pymongo import MongoClient
import subprocess

# MongoDB Connection Setup
client = MongoClient("mongodb+srv://bhaveshshastri6:4t0xgsyBzVrujAlz@duomate.kagwiar.mongodb.net/?retryWrites=true&w=majority&appName=duoMate")  # Update with your MongoDB URI if needed
db = client["intents"]  # Replace with your database name
collection = db["mails"]  # Replace with your collection name

# Load tokenizer and model
model_name = "google/gemma-2b-it"
tokenizer = AutoTokenizer.from_pretrained(model_name)  # Use the correct tokenizer for Gemma
tokenizer.pad_token = tokenizer.eos_token

# Define quantization config (same as during fine-tuning)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4"
)

# Load the base model with quantization
base_model = AutoModelForCausalLM.from_pretrained(model_name, quantization_config=bnb_config)

# Load the fine-tuned LoRA adapters
model = PeftModel.from_pretrained(base_model, "C:/Users/Ch_Kumar_Kartik/Coding Resources/Projects/Hackcrux_LNMIIT/hackcrux-gemma")
model.eval()
model.to("cuda")  # Ensure model is on GPU

def generate_info(email):
    # Format the email as input for the model
    prompt = (
        f"Extract structured information from the following email:\n\n"
        f"Email Details:\n"
        f"To: {email['to']}\n"
        f"From: {email['from']}\n"
        f"Subject: {email['subject']}\n"
        f"Body: {email['body']}\n\n"
        f"Extract the following information in this format:\n"
        f"- Event Title: [Event title]\n"
        f"- Urgency: [Urgency level]\n"
        f"- Event Date: [Event date]\n"
        f"- Event Time: [Event time]\n"
        f"- Keyword(s): [Keywords]\n"
        f"Ensure the extracted information is accurate and relevant to the email."
    )

    # Tokenize input and send it to GPU
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to("cuda")

    # Generate model output with improved parameters
    output = model.generate(
        **inputs,
        max_length=450,
        num_beams=4,
        no_repeat_ngram_size=2,
        temperature=0.7,
        top_k=50
    )

    # Decode and return response
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Post-process to extract structured fields into a dictionary
    extracted_info = {
        "event_title": "Not specified",
        "urgency": "Not specified",
        "date": "Not specified",
        "time": "Not specified",
        "keyword": "Not specified"
    }
    lines = generated_text.split("\n")
    for line in lines:
        if line.startswith("- Event Title:"):
            extracted_info["event_title"] = line.replace("- Event Title:", "").strip()
        elif line.startswith("- Urgency:"):
            extracted_info["urgency"] = line.replace("- Urgency:", "").strip()
        elif line.startswith("- Event Date:"):
            extracted_info["date"] = line.replace("- Event Date:", "").strip()
        elif line.startswith("- Event Time:"):
            extracted_info["time"] = line.replace("- Event Time:", "").strip()
        elif line.startswith("- Keyword(s):"):
            extracted_info["keyword"] = line.replace("- Keyword(s):", "").strip()

    return extracted_info

def generate_reply(email):
    # Format the email as input for the model
    prompt = (
        f"Generate a professionally worded reply email based on the following details:\n\n"
        f"Original Email:\n"
        f"To: {email['to']}\n"
        f"From: {email['from']}\n"
        f"Subject: {email['subject']}\n"
        f"Body: {email['body']}\n\n"
        f"Reply Email Format:\n"
        f"Reply-To: [Recipient's email]\n"
        f"Reply-From: [Sender's email]\n"
        f"Reply-Subject: [Subject line]\n"
        f"Reply-Body: [Body of the reply email]\n\n"
        f"Ensure the reply is concise, professional, and relevant to the original email."
    )

    # Tokenize input and send it to GPU
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512).to("cuda")

    # Generate model output with improved parameters
    output = model.generate(
        **inputs,
        max_length=450,
        num_beams=4,
        no_repeat_ngram_size=2,
        temperature=0.7,
        top_k=50
    )

    # Decode and return response
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Post-process to extract reply fields into a dictionary
    reply_info = {
        "reply_to": "Not specified",
        "reply_from": "Not specified",
        "reply_subject": "Not specified",
        "reply_body": "Not specified"
    }
    lines = generated_text.split("\n")
    reply_body_lines = []
    in_reply_body = False
    for line in lines:
        if line.startswith("Reply-To:"):
            reply_info["reply_to"] = line.replace("Reply-To:", "").strip()
        elif line.startswith("Reply-From:"):
            reply_info["reply_from"] = line.replace("Reply-From:", "").strip()
        elif line.startswith("Reply-Subject:"):
            reply_info["reply_subject"] = line.replace("Reply-Subject:", "").strip()
        elif line.startswith("Reply-Body:"):
            if not in_reply_body:
                in_reply_body = True
                reply_body_lines.append(line.replace("Reply-Body:", "").strip())
        elif in_reply_body:
            reply_body_lines.append(line.strip())

    if reply_body_lines:
        reply_info["reply_body"] = " ".join(reply_body_lines)

    return reply_info

# Retrieve the latest document from MongoDB
latest_document = collection.find_one(
    sort=[("_id", -1)]  # Sort by _id in descending order to get the latest document
)

if latest_document:
    print("Processing latest email from MongoDB:")
    print(f"To: {latest_document['to']}")
    print(f"From: {latest_document['from']}")
    print(f"Subject: {latest_document['subject']}")
    print(f"Body: {latest_document['body']}\n")

    # Prepare email data for processing
    email_data = {
        "to": latest_document["to"],
        "from": latest_document["from"],
        "subject": latest_document["subject"],
        "body": latest_document["body"]
    }

    # Generate extracted info and reply
    extracted_info = generate_info(email_data)
    reply_info = generate_reply(email_data)

    # Update the document in MongoDB
    update_data = {
        "event_title": extracted_info["event_title"],
        "urgency": extracted_info["urgency"],
        "date": extracted_info["date"],
        "time": extracted_info["time"],
        "keyword": extracted_info["keyword"],
        "reply_to": reply_info["reply_to"],
        "reply_from": reply_info["reply_from"],
        "reply_subject": reply_info["reply_subject"],
        "reply_body": reply_info["reply_body"]
    }

    collection.update_one(
        {"_id": latest_document["_id"]},
        {"$set": update_data}
    )

    print("Updated document in MongoDB with the following fields:")
    print("Extracted Information:")
    print(f"- Event Title: {extracted_info['event_title']}")
    print(f"- Urgency: {extracted_info['urgency']}")
    print(f"- Event Date: {extracted_info['date']}")
    print(f"- Event Time: {extracted_info['time']}")
    print(f"- Keyword(s): {extracted_info['keyword']}")
    print("\nGenerated Reply:")
    print(f"Reply-To: {reply_info['reply_to']}")
    print(f"Reply-From: {reply_info['reply_from']}")
    print(f"Reply-Subject: {reply_info['reply_subject']}")
    print(f"Reply-Body: {reply_info['reply_body']}")
    
    
    subprocess.run(["python", "mongo_to_model_onlyextractedinfo.py"])
else:
    print("No documents found in the collection.")

# Close MongoDB connection
client.close()