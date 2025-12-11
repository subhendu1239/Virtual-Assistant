# Virtual-Assistant

# 🤖 Virtual Assistant Web App  
A responsive, browser-based virtual assistant built using **HTML, CSS, and JavaScript**.  
The assistant allows users to interact through text or voice, get quick answers, set reminders, manage tasks, and receive real-time feedback — all inside a simple and clean UI.

---

## 🚀 Features

### 🔹 **User Features**
- Text-based and optional voice-based input
- Ask general questions and get predefined smart answers
- Set reminders and manage simple tasks
- Check weather info (static or API-ready structure)
- Interactive chat-style UI for responses
- Mobile-friendly, responsive design
- Smooth animations and user-friendly layout

### 🔹 **Admin Panel Features**
- Secure admin login using simple credentials (JS + localStorage)
- Update/Customize assistant responses through an editable knowledge base
- Manage user accounts (add/remove users)
- View user interaction logs
- Basic usage statistics (total requests, active users, logs)

---

## 🧠 How It Works (Architecture Overview)

### 1️⃣ **Input Processing**
Users can type or speak queries.  
The script detects **keywords** to understand user intent.

### 2️⃣ **Intent Recognition**
A keyword-matching engine maps:
- "time", "date" → time/date module  
- "weather" → weather response  
- "reminder" → reminder module  
- "task" / "todo" → task manager  

### 3️⃣ **Response Generation**
Based on intent, the assistant:
- Picks a predefined response  
- Executes logic (like creating a reminder)
- Sends a message back to UI with confirmation

### 4️⃣ **Admin Customization**
Admins can modify:
- Response database  
- Keyword mappings  
- Interaction logs  
Stored using **localStorage**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | HTML, CSS (responsive + animations) |
| Logic | Vanilla JavaScript |
| Storage | LocalStorage (for admin data, logs, knowledge base) |
| Optional | Web Speech API for voice input/output |
