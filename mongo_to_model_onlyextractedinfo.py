import google.generativeai as genai
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Gemini API key from environment variable
genai.configure(api_key=os.getenv("g_api"))
model = genai.GenerativeModel("gemini-1.5-pro")

# MongoDB connection setup
client = MongoClient('mongodb+srv://bhaveshshastri6:4t0xgsyBzVrujAlz@duomate.kagwiar.mongodb.net/?retryWrites=true&w=majority&appName=duoMate')  # Adjust connection string as needed
db = client['intents']  # Replace with your database name
collection = db['mails']  # Replace with your collection name

def analyze_email(to_email, from_email, subject, body):
    """Analyze email content and extract key information"""
    prompt = f"""Analyze this email and extract:
    1. Keyword (single word)
    2. Event title (necessary)
    3. Event date (if any, in YYYY-MM-DD format)
    4. Event time (if any, in HH:MM format)
    # 5. Draft a concise, complete reply (at least 2-3 sentences, addressing the sender by name)
    
    Email details:
    To: {to_email}
    From: {from_email}
    Subject: {subject}
    Body: {body}
    
    Return the response in this exact format:
    Keyword: "word1"
    Event Title: [title or None]
    Event Date: [date or None]
    Event Time: [time or None]
    # Reply: [reply text]
    """
    
    chat = model.start_chat(history=[])
    try:
        response = chat.send_message(prompt).text
    except Exception as e:
        print(f"API error: {e}")
        return {
            'keyword': None,
            'event_title': None,
            'event_date': None,
            'event_time': None,
            # 'reply': 'Error: Could not generate reply due to API issue'
        }
    
    # Parse the response
    result = {
        'keyword': None,
        'event_title': None,
        'event_date': None,
        'event_time': None,
        # 'reply': ''
    }
    
    try:
        lines = response.split('\n')
        # reply_lines = []
        for line in lines:
            if line.startswith("Keyword:"):
                keyword_str = line.split(': ')[1].strip('[]')
                result['keyword'] = keyword_str
            elif line.startswith("Event Title:"):
                result['event_title'] = line.split(': ')[1] if line.split(': ')[1] != 'None' else None
            elif line.startswith("Event Date:"):
                result['event_date'] = line.split(': ')[1] if line.split(': ')[1] != 'None' else None
            elif line.startswith("Event Time:"):
                result['event_time'] = line.split(': ')[1] if line.split(': ')[1] != 'None' else None
            # elif line.startswith("Reply:"):
            #     reply_lines.append(line.split(': ')[1])
            # elif reply_lines:
            #     reply_lines.append(line)
        
        # result['reply'] = '\n'.join(reply_lines).strip()
        # if not result['reply']:
        #     result['reply'] = "Error: No reply generated"
    except Exception as e:
        print(f"Error parsing response: {e}")
        # result['reply'] = f"Error: Failed to parse response - {str(e)}"
    
    return result

def process_latest_email():
    # Get the latest document from MongoDB
    latest_email = collection.find().sort("_id", -1).limit(1)
    
    try:
        email_doc = next(latest_email)
    except StopIteration:
        print("No emails found in the database")
        return
    
    # Extract email details
    to_email = email_doc.get('to', '')
    from_email = email_doc.get('from', '')
    subject = email_doc.get('subject', '')
    body = email_doc.get('body', '')
    
    # Analyze the email
    analysis = analyze_email(to_email, from_email, subject, body)
    
    # Prepare output in requested format
    output = {
        'event_title': analysis['event_title'],
        'date': analysis['event_date'],
        'time': analysis['event_time'],
        'keyword': analysis['keyword'] if analysis['keyword'] else None
        # 'reply_to': from_email,
        # 'reply_from': to_email,
        # 'reply_subject': f"Re: {subject}",
        # 'reply_body': analysis['reply']
    }
    
    # Update the latest document in MongoDB with analysis results
    collection.update_one(
         {'_id': email_doc['_id']},
         {'$set': output}
     )
    
    # Print results for verification
    print("Analysis results (not appended to MongoDB):")
    for key, value in output.items():
        print(f"{key}: {value}")

if __name__ == "__main__":
    process_latest_email()
