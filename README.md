# 🏥 AI-Powered Healthcare Appointment Management System

An AI-driven Healthcare Appointment Management System that leverages **LangGraph** to orchestrate multiple intelligent agents for automating appointment booking, cancellation, rescheduling, doctor recommendations, queue management, and patient assistance.

The system enables patients to interact with an AI assistant using natural language, while specialized agents collaborate to understand requests, retrieve information, and perform the required healthcare operations.

---

# ✨ Features

### 🤖 AI Multi-Agent System (LangGraph)

* Multi-agent workflow orchestration using **LangGraph**
* Intelligent routing of user requests to specialized agents
* Context-aware conversational AI assistant
* Autonomous decision-making for appointment-related tasks

### 📅 Appointment Booking Agent

* Understands natural language booking requests
* Guides patients through the booking process
* Displays available doctors
* Shows available appointment slots
* Books appointments automatically after collecting required information

### ❌ Appointment Cancellation Agent

* Identifies existing appointments
* Cancels appointments upon patient request
* Updates appointment records automatically

### 🔄 Intelligent Rescheduling Agent

* Detects rescheduling intent
* Retrieves current appointment details
* Suggests alternative slots
* Updates appointments seamlessly

### 👨‍⚕️ Doctor Recommendation Agent

* Recommends doctors based on patient symptoms or specialty
* Helps patients select the appropriate specialist

### ⏳ Queue Monitoring Agent

* Displays queue status
* Shows estimated waiting time
* Provides real-time queue updates

### 📋 Appointment Information Agent

* Retrieves appointment details
* Displays appointment status
* Shows doctor information

### 👥 Role-Based Dashboards

#### Patient Dashboard

* AI Healthcare Assistant
* Book appointments
* View appointment details
* Queue monitoring
* Appointment management

#### Doctor Dashboard

* View scheduled appointments
* Manage appointment status
* Monitor daily schedule

---

# 🏗️ System Architecture

```
Patient
    │
    ▼
AI Assistant
    │
    ▼
LangGraph Router
    │
    ├──────────────► Booking Agent
    ├──────────────► Cancellation Agent
    ├──────────────► Rescheduling Agent
    ├──────────────► Queue Agent
    ├──────────────► Doctor Recommendation Agent
    └──────────────► Appointment Information Agent
                         │
                         ▼
                  MongoDB Database
                         │
                         ▼
                 Patient / Doctor Dashboard
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## AI & Agent Framework

* Ollama - Qwen 4B
* LangGraph

---

# 📂 Project Structure

```
backend/
│
├── agents/
├── graph/
├── controllers/
├── routes/
├── models/
├── services/
├── middleware/
└── server.js

frontend/
│
├── components/
├── pages/
├── services/
├── context/
└── App.jsx
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Sowmithra12/AI-Healthcare-Appointment-Management-System.git
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔮 Future Enhancements

* Voice-based AI Assistant
* AI-powered No-Show Prediction
* Automated Reminder Agent
* Doctor Availability Optimization
* Real-time Notification System
* Analytics Dashboard
* Electronic Health Record (EHR) Integration

---

# 👨‍💻 Developed By

**Sowmithra S**

AI-Powered Healthcare Appointment Management System
