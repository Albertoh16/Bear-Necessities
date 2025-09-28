# 🐻 PrepBear – AI Mock Interview Platform

PrepBear is an AI-powered mock interview web application built on top of Google’s open-source Live API Web Console project. PrepBear helps students and job seekers practice behavioral and technical interviews tailored to specific job titles, companies, and their resumes.

Users can upload their resume and specify the interview type, target role, and company. The AI then simulates a real-time mock interview, providing personalized, voice-based Q&A to help users prepare with confidence.

---
## Demo
[![Watch the demo](https://img.youtube.com/vi/uNDWa84R2Aw/0.jpg)](https://youtu.be/uNDWa84R2Aw)

## 🚀 Features

- 🎤 **Real-time, voice-based mock interviews**
- 🧠 **Interview types:** Technical and Behavioral
- 🧾 **Tailored to your Resume, Job Title, and Company**
- 🦜 **Built using Google’s Live API for low-latency streaming**
- 🛠️ **Fully client-side React app**
- 🏢 **Company Insight Page:** Research companies before your interview (see below)

---

## 📦 Installation & Usage

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Albertoh16/Bear-Necessities.git
    cd Bear-Necessities
    ```
2. **Install Dependencies**
    ```bash
    npm install
    ```
3. **Set up Environment Variables**

    Create a `.env` file in the root of your project with your Gemini API key:
    ```
    REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
    REACT_APP_TEXT_API=your_gemini_api_key_here
    ```

4. **Run the App**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 How It Works

1. User lands on the Launch Page.
2. They enter:
    - 🎯 **Interview Type:** Technical or Behavioral
    - 💼 **Job Title**
    - 🏢 **Company Name**
    - 📄 **Resume (PDF Upload)**
3. The app passes this data to the Gemini-powered backend via WebSocket (Google Live API).
4. The AI dynamically simulates an interview session based on the inputs.
5. Users can respond via voice, and the model listens and adapts in real-time.

---

## 🏢 Company Insight Page

PrepBear includes a dedicated **Company Insight** page to help users research companies before conducting their interview session with our AI agent.

**Features:**
- Get detailed insights about a given company.
- Review company background, culture, recent news, and interview tips.
- Use this information to better tailor your interview preparation and responses.

This feature empowers students and job seekers to make informed decisions and approach interviews with confidence.

---

## 🛠 Tech Stack

- **React (Vite)**
- **Google Live API** (WebSocket-based audio streaming)
- **Gemini 1.5 API** (for conversation + function calls)
- **Web Audio API & MediaRecorder**
- **VegaEmbed** (optional, for future visualization features)

---

## 🧾 Original Project Citation

PrepBear is built upon Google’s experimental open-source project:

- [Google Live API – Web Console](https://github.com/google/generative-ai-live-api-web)

This is an experiment showcasing the Live API, not an official Google product.  
Please respect copyright and trademark rights when sharing or creating derivative works.

---

## 🧰 Available Scripts

| Script           | Description                        |
|------------------|------------------------------------|
| `npm start`      | Runs the app in development mode    |
| `npm run build`  | Builds the app for production       |

---

## 📄 License

This project is a derivative work based on Google's open-source Live API Web Console. See their license for more details.

All additional modifications and features in PrepBear are released under the MIT License.
