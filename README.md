# 🤖 DuoMate - Your AI-Powered Digital Twin

**DuoMate** is an AI-powered productivity assistant that acts as your digital twin — learning your tone, preferences, and working style to automate communication, scheduling, and information management.

---
![Screenshot 2025-03-30 110105](https://github.com/user-attachments/assets/27b066a9-0dd4-4f96-8985-24adb2e7b39f)

---

## 🚀 Features

### 📥 Intelligent Email Management
- Automatically **receive emails**
- **Extract key information** (names, dates, topics, deadlines)
- Generate **context-aware personalized replies**
- **Send replies** directly from the platform

### 📅 Smart Calendar Automation
- Auto-detect meeting invites or event cues from emails
- **Schedule and reschedule** meetings intelligently

### 📰 Suggestive News Feeds
- Curate personalized news feeds based on your browsing and interest history
- Summarize articles and highlight actionable insights

### 🔍 Research Assistant
- Fetch articles, papers, or relevant documents
- Summarize key takeaways and provide structured insights
- Filter irrelevant content and boost knowledge discovery

---



## 🛠️ Tech Stack

- **Frontend**: React.js / HTML / CSS / Tailwind  
- **Backend**: Python  
- **NLP**: LoRA, Hugging Face Transformers  
- **AI Models**: Fine-tuned LLMs-Gemini and gemma-2b-it
- **Email Integration**: Gmail API / IMAP   
- **Database**: MongoDB  
- **Authentication**: OAuth 2.0 (Google)    

---

## 📦 Installation

```bash
git clone https://github.com/Ch-Kumar-Kartik/Duo-Mate.git
cd duomate
#install backend requirements
cd backend
npm install
cd src
node server.js  #server is up & db connected
# connecting to the frontend
cd .. && cd ..
cd duomate-ai-synth
npm install
