# 🎯 Interview Buddy

### AI-Powered Technical Interview Simulator

Interview Buddy is an AI-powered technical interview platform designed to simulate realistic software engineering interviews.

Instead of following a fixed list of questions, Interview Buddy conducts an adaptive interview where the AI evaluates a candidate's responses, asks relevant follow-up questions, explores technical depth, and generates a structured performance report at the end.

> **Practice interviews. Get challenged. Understand your weaknesses. Improve.**

---

## ✨ Features

### 🤖 AI-Driven Interviews

* Dynamic technical questioning
* Context-aware follow-up questions
* Adaptive interview flow based on candidate responses
* Questions can vary based on the selected role and interview configuration
* AI evaluates the quality and depth of responses

### 🎤 Realistic Interview Experience

* Voice-based interaction
* Camera and microphone support
* Browser-based speech recognition
* Interview-style UI designed to replicate a real technical interview environment

### 📊 AI Interview Evaluation

After completing an interview, candidates receive a structured evaluation covering areas such as:

* Technical Knowledge
* Problem Solving
* Core Fundamentals
* Depth of Understanding
* Communication
* Follow-up Handling
* Overall Interview Performance

### 📝 Interview Report

The platform converts the interview conversation into a structured report that helps candidates identify:

* What they did well
* Where they struggled
* Topics requiring further preparation
* Areas where answers lacked depth
* Suggestions for improvement

### 🎨 Modern Interface

* Responsive UI
* Clean interview-focused design
* Interactive components
* Real-time interview state
* Candidate-friendly dashboard

---

## 🧠 How It Works

```text
┌──────────────────────┐
│   Candidate Setup    │
│                      │
│ Role / Configuration │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Start Interview    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      AI Question     │
│                      │
│ Technical Question   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Candidate Response   │
│                      │
│ Voice / Text         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    AI Evaluation     │
│                      │
│ Analyze Response     │
└──────────┬───────────┘
           │
           ▼
      ┌────┴────┐
      │         │
      ▼         ▼
 Follow-up   Next Topic
      │         │
      └────┬────┘
           │
           ▼
┌──────────────────────┐
│   Interview Report   │
│                      │
│ Performance Analysis │
└──────────────────────┘
```

---

## 🏗️ Architecture

```text
                    ┌──────────────────┐
                    │     Frontend     │
                    │  React / Next.js │
                    └────────┬─────────┘
                             │
                         HTTP/API
                             │
                             ▼
                    ┌──────────────────┐
                    │      Backend     │
                    │ Node.js/Express  │
                    └───────┬──────────┘
                            │
                ┌───────────┼───────────┐
                │           │           │
                ▼           ▼           ▼
           ┌────────┐  ┌──────────┐  ┌─────────┐
           │ MongoDB│  │ AI / LLM │  │ Browser │
           │        │  │  Layer   │  │ APIs    │
           └────────┘  └──────────┘  └─────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Next.js**
* **Tailwind CSS**
* JavaScript
* Browser Speech Recognition APIs
* Camera & Microphone APIs

### Backend

* **Node.js**
* **Express.js**
* REST APIs
* Authentication

### Database

* **MongoDB**

### AI

* Large Language Model APIs
* Prompt-based interview generation
* Context-aware response evaluation
* AI-generated interview reports

---

## 📁 Project Structure

```text
Interview-Buddy/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── public/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
│
├── package.json
├── package-lock.json
└── README.md
```

> The exact structure may vary as the project evolves.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Git

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/interview-buddy.git
```

```bash
cd interview-buddy
```

---

### 2. Install dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

---

### 3. Configure environment variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
AI_API_KEY=your_ai_api_key
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file or API keys to GitHub.

---

### 4. Start the backend

```bash
cd server
npm run dev
```

---

### 5. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application should now be available at the local development URL shown by Next.js.

---

## 🔐 Environment Variables

| Variable     | Description                    |
| ------------ | ------------------------------ |
| `PORT`       | Backend server port            |
| `MONGO_URI`  | MongoDB connection string      |
| `AI_API_KEY` | API key for the AI provider    |
| `JWT_SECRET` | Secret used for authentication |

---

## 🎯 Use Cases

Interview Buddy can be used by:

* Students preparing for placements
* Software engineering candidates
* Developers preparing for job switches
* Candidates practicing technical interviews
* Anyone looking for repeated interview practice without requiring a human interviewer

---

## 🔮 Future Improvements

Potential improvements include:

* [ ] Multiple AI interviewer personalities
* [ ] More specialized interview tracks
* [ ] Coding-round simulation
* [ ] Live code editor
* [ ] System design interviews
* [ ] Behavioral interviews
* [ ] Resume-based questioning
* [ ] Job-description-based interviews
* [ ] Interview history and performance tracking
* [ ] Detailed performance analytics
* [ ] Personalized preparation plans
* [ ] Multi-language interview support

---

## 📸 Screenshots

Add screenshots of the major screens here:

```text
Landing Page
↓
Interview Setup
↓
Live Interview
↓
Interview Report
```

You can replace this section with actual screenshots once the UI is finalized.

---

## 💡 What Makes Interview Buddy Different?

Traditional interview preparation platforms generally rely on predefined question banks.

Interview Buddy focuses on **conversation-driven interviewing**.

The AI can use a candidate's previous answer as context and decide whether to:

```text
Ask a follow-up
      ↓
Explore deeper
      ↓
Change topic
      ↓
Move to another difficulty
      ↓
Continue the interview
```

This makes each interview less predictable and closer to the conversational nature of a real technical interview.

---

## 🧪 Project Status

**Status:** Active Development 🚧

The project is continuously being improved with new interview capabilities, UI improvements, and AI-driven evaluation features.

---

## 👨‍💻 Author

**Shahnawaz Shaikh**

Computer Science Student & Software Developer

Interested in:

* Software Engineering
* AI-powered applications
* Full-Stack Development
* Developer Tools

---

## ⭐ Support

If you find the project interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is currently intended for educational and portfolio purposes.
