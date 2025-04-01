# pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client pymongo
import os
import base64
import sys
import json
from pymongo import MongoClient
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.auth.transport.requests import Request

# Define the scopes (permissions) needed
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']  # Read-only access to Gmail

# MongoDB Connection (Update with your connection string)
MONGO_URI = "mongodb+srv://bhaveshshastri6:4t0xgsyBzVrujAlz@duomate.kagwiar.mongodb.net/?retryWrites=true&w=majority&appName=duoMate"
DB_NAME = "intents"
COLLECTION_NAME = "mails"

def connect_mongo():
    """Connect to MongoDB and return the collection."""
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    return db[COLLECTION_NAME]

def authenticate_gmail():
    """Authenticate with Gmail API using OAuth2."""
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("C:/Users/Ch_Kumar_Kartik/Downloads/credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return creds

def get_gmail_service():
    """Build and return the Gmail API service object."""
    creds = authenticate_gmail()
    return build('gmail', 'v1', credentials=creds)

def fetch_emails(service, collection):
    """Fetch emails from Gmail and save them to MongoDB."""
    try:
        results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=100).execute()
        messages = results.get('messages', [])
        
        if not messages:
            print("No messages found.")
            return
        
        print(f"Found {len(messages)} messages. Processing up to 15 emails.")
        email_counter = 0

        for message in messages:
            if email_counter >= 15:
                break
            msg_id = message['id']
            email_entry = process_email(service, msg_id)
            if email_entry:
                collection.insert_one(email_entry)  # Insert into MongoDB
                email_counter += 1
        print(f"Stored {email_counter} emails in MongoDB.")

    except HttpError as error:
        print(f"An error occurred: {error}")
        sys.exit()

def process_email(service, msg_id):
    """Process a single email and return its content as a dictionary."""
    try:
        msg = service.users().messages().get(userId='me', id=msg_id, format='full').execute()
        payload = msg.get('payload', {})
        headers = payload.get('headers', [])
        parts = payload.get('parts', [])

        subject = next((header['value'] for header in headers if header['name'] == 'Subject'), 'No Subject')
        sender = next((header['value'] for header in headers if header['name'] == 'From'), 'Unknown Sender')
        receiver = next((header['value'] for header in headers if header['name'] == 'To'), 'Unknown Receiver')
        print(f"Processing email: {subject}")

        body = extract_body(payload, parts)

        return {
            "to": receiver,
            "from": sender,
            "subject": subject,  # Added subject to the dictionary
            "body": body
        }
    
    except HttpError as error:
        print(f"Error processing message {msg_id}: {error}")
        return None

def extract_body(payload, parts):
    """Extract the email body from the payload or parts."""
    if not parts:
        if payload.get('mimeType') == 'text/plain':
            data = payload.get('body', {}).get('data')
            if data:
                return base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')
    else:
        for part in parts:
            if part.get('mimeType') == 'text/plain':
                data = part.get('body', {}).get('data')
                if data:
                    return base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')
    return ""

if __name__ == '__main__':
    service = get_gmail_service()
    collection = connect_mongo()
    fetch_emails(service, collection)