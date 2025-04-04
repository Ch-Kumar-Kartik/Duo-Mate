# 🤖 DuoMate - Your AI-Powered Digital Twin

**DuoMate** is an AI-powered productivity assistant that acts as your digital twin — learning your tone, preferences, and working style to automate communication, scheduling, and information management.

---

![Screenshot 2025-03-30 110105](https://github.com/user-attachments/assets/27b066a9-0dd4-4f96-8985-24adb2e7b39f)

---
# **About the model:** 

duo-mate is a fine-tuned version of the google/gemma-2b-it model, designed for generating professional email replies and extracting structured information from emails. It can process email data (including to, from, subject, and body) to extract metadata such as event titles, dates, times, urgency levels, and keywords, and generate concise, professional reply emails. The model is optimized for text generation tasks in English and uses the PEFT (Parameter-Efficient Fine-Tuning) library with LoRA (Low-Rank Adaptation) for efficient fine-tuning.

duo-mate is a causal language model fine-tuned from google/gemma-2b-it using LoRA for efficient adaptation. It is designed to assist with email-related tasks, specifically:

- Extracting structured information from emails, such as event titles, dates, times, urgency levels, and keywords.

- Generating professional reply emails with fields like Reply-To, Reply-From, Reply-Subject, and Reply-Body.

- The model was fine-tuned on a custom dataset of email data, enabling it to understand email contexts and produce relevant, professional responses. It leverages 4-bit quantization for efficient inference on resource-constrained hardware

**Model type: Causal Language Model (fine-tuned with LoRA)**

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
