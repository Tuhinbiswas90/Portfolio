# Tuhin Biswas — Portfolio Website
**Full-Stack Portfolio** | HTML + CSS + JS + Node.js + MongoDB

---

## 🚀 Features
- ⚡ Animated loading screen
- 🎯 Custom cursor with ring follow effect
- 🌐 Particle canvas background
- ✍️ Typewriter hero text
- 📬 Working contact form → saves to MongoDB
- 👁 Live visitor counter
- ⬇ Resume download button
- 📱 Fully responsive
- 🎨 Scroll reveal animations

---

## 📁 Project Structure
```
portfolio/
├── public/
│   ├── index.html       ← Main HTML
│   ├── resume.pdf       ← PUT YOUR RESUME HERE
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── server.js            ← Node.js + Express backend
├── package.json
├── .env.example
└── README.md
```

---

## ⚙️ Setup (Local)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your MongoDB URI.

### 3. Get free MongoDB
- Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Create free cluster
- Get connection string
- Paste into `.env` as `MONGODB_URI`

### 4. Add your resume
- Put your `resume.pdf` file inside `public/` folder

### 5. Run locally
```bash
npm run dev
```
Open: http://localhost:3000

---

## 🌍 Deploy on Render (FREE)

1. Push this folder to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add Environment Variable:
   - `MONGODB_URI` = your MongoDB connection string
6. Deploy! ✅

Your live URL: `https://tuhin-portfolio.onrender.com`

---

## 📬 View Contact Messages
After deploying, visit:
```
https://your-site.onrender.com/api/messages
```
This shows all messages sent through the contact form.

---

## 🔧 Customize
- Edit `public/index.html` — update your info, project links, etc.
- Edit `public/css/style.css` — change colors via CSS variables at top
- Edit `public/js/script.js` — update typed roles array

---

Built with ❤️ by **Tuhin Biswas** | Kolkata, India | 2026
