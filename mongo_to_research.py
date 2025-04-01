import google.generativeai as genai
from duckduckgo_search import DDGS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Set your Gemini API key from environment variable
genai.configure(api_key=os.getenv("g_api"))

# MongoDB setup
mongo_client = MongoClient("mongodb+srv://bhaveshshastri6:4t0xgsyBzVrujAlz@duomate.kagwiar.mongodb.net/?retryWrites=true&w=majority&appName=duoMate")
db = mongo_client["intents"]
research = db["research"]

# Function to search using DuckDuckGo
def search_duckduckgo(query, max_results=5):
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, region="wt-wt", safesearch="moderate", max_results=max_results):
            results.append(f"{r['title']} - {r['href']}\n{r['body']}")
    return "\n\n".join(results)

# Function to save to MongoDB
def save_conversation(prompt, response):
    conversation_data = {
        "timestamp": datetime.utcnow(),
        "prompt": prompt,
        "response": response
    }
    research.insert_one(conversation_data)

# Agent loop
def research_assistant():
    print("🔍 DuoMate Research Assistant Ready! Type 'exit' to quit.\n")
    
    chat = model.start_chat(history=[])
    
    while True:
        user_input = input("🧑‍💻 You: ")
        if user_input.lower() == "exit":
            mongo_client.close()  # Close MongoDB connection
            break

        if "search:" in user_input.lower():
            query = user_input.split("search:", 1)[1].strip()
            search_results = search_duckduckgo(query)
            print("\n🌐 Search Results:\n", search_results)
            print("\n🤖 Assistant Thinking...\n")
            response = chat.send_message(f"Based on the following search results, summarize or answer: {query}\n\n{search_results}")
            save_conversation(user_input, response.text)
        else:
            response = chat.send_message(user_input)
            save_conversation(user_input, response.text)

        print("🤖 Assistant:", response.text, "\n")

def main():
    print("Starting research assistant...")
    research_assistant()

if __name__ == "_main_":
    main()