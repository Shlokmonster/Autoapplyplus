# 🚀 AutoApply++
> **The Ultimate Automated Internship Finder & Application Bot**

![Banner](https://via.placeholder.com/1200x400?text=AutoApply++_Dashboard_Preview)
*(You can replace this link with a real screenshot later)*

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)](https://pptr.dev/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

</div>

---

## 📖 Overview
**AutoApply++** is a full-stack automated tool designed to streamline the internship hunt. It scrapes job listings from various platforms, tracks your applications, and even uses AI to generate tailored cover letters.

Stop wasting hours manually scrolling and applying—let the bot do the heavy lifting!

## ✨ Key Features
- **🤖 Automated Scraper**: Built with Puppeteer to fetch internship listings automatically (supports Internshala).
- **🧠 AI-Powered**: Uses Google Gemini to generate custom, context-aware cover letters for each application.
- **📊 Interactive Dashboard**: Visualize your application stats, recent jobs, and scraper activity with real-time charts.
- **⚙️ Configurable**: Set your preferred job keywords, locations, and schedules in the Settings page.
- **📝 Application Logs**: Keep a detailed history of every action taken by the bot.
- **🔐 Secure Auth**: Complete Signup/Login system with JWT authentication and protected routes.

---

## 🛠️ Tech Stack
### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Automation**: [Puppeteer](https://pptr.dev/) & [Node-Cron](https://www.npmjs.com/package/node-cron)
- **AI**: [Google Generative AI](https://www.npmjs.com/package/@google/generative-ai)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v16 or higher
- **MongoDB**: Installed locally or a valid cloud connection URI
- **Google API Key**: For Gemini AI features

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/shlokkadam/autoapply.git
cd autoapply
```

#### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the backend:
```bash
npm run dev
# Server runs on http://localhost:5000
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 🕹️ Usage Guide
1.  **Register/Login**: Create an account to access your personal dashboard.
2.  **Configure Settings**: Go to the **Settings** page to define your target keywords (e.g., "Full Stack", "React") and locations.
3.  **Run Scraper**: Trigger the scraper manually from the Settings page to fetch fresh jobs.
4.  **Review Jobs**: Check the **Jobs** page to see listings found.
5.  **Generate Cover Letter**: Use the AI tools to prepare your application materials instantly.

---

## 📂 Project Structure
```
autoapply/
├── backend/            # Express, MongoDB, Puppeteer
│   ├── src/
│   │   ├── controllers/# Logic for jobs, auth, settings
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   ├── scrapers/   # Puppeteer scripts
│   │   └── services/   # AI & independent services
│   └── package.json
├── frontend/           # React, Tailwind, Vite
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application screens (Dashboard, Jobs, etc.)
│   │   ├── context/    # Global state (Auth)
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).

<br />
<div align="center">
  Built with ❤️ by <b>Shlok Kadam</b>
</div>
