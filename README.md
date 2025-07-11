# 🩶 Mini URL Shortener

A **simple full-stack URL shortener** with React frontend and Node/Express/Mongo backend, featuring clean short code generation, click analytics, optional expiry, rate limiting, and Docker support.

---

## 🚀 Features

✅ Shorten long URLs  
✅ Redirect via short code  
✅ Track click counts  
✅ Optional expiry support  
✅ Rate limiting  
✅ React frontend for testing  
✅ Docker + Docker Compose support

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB  
- **Frontend:** React (Vite)  
- **DevOps:** Docker, Docker Compose

---

## 📂 Project Structure

```plaintext
.
├── backend
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend
│   ├── src
│   │   └── App.jsx
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

---

## ⚡ API Endpoints

### POST `/shorten`
Shortens a URL.

**Request:**
```json
{
  "url": "https://example.com/some/very/long/link",
  "expireIn": 2
}
```
- `url`: required  
- `expireIn`: optional (days)

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

### GET `/:code`
Redirects to the **original URL** if valid and not expired.

### GET `/analytics/:code`
Returns:
```json
{
  "originalUrl": "https://example.com",
  "clicks": 5,
  "createdAt": "2025-07-10T12:34:56.789Z",
  "expiresAt": "2025-07-12T12:34:56.789Z"
}
```

---

## 🧑‍💻 Frontend Usage

✅ Enter long URL + optional expiry  
✅ Generate short URLs  
✅ Click to test redirects  
✅ View click analytics

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Arpit-Krishna/mini-url-shortener.git
cd mini-url-shortener
```

### 2️⃣ Environment Variables
Create `backend/.env`:
```env
MONGO_URI=mongodb://mongo:27017/urlShortenerDB
BASE_URL=http://localhost:5000
PORT=5000
```

### 3️⃣ Dockerized Setup (Recommended)
Ensure Docker + Docker Compose are installed.

Run:
```bash
docker-compose up --build
```
✅ Backend: http://localhost:5000  
✅ Frontend: http://localhost:5173

### 4️⃣ Non-Docker Local Setup (Optional)
#### Backend:
```bash
cd backend
npm install
npm run dev
```
#### Frontend:
```bash
cd frontend
npm install
npm run dev
```
✅ Ensure MongoDB is running locally (`mongodb://localhost:27017`).

---

## 🧪 Testing
✅ Use React frontend for end-to-end testing.  
✅ Use Postman for manual API testing.

---

## 🐳 Docker Commands
**Start:**
```bash
docker-compose up --build
```
**Stop:**
```bash
docker-compose down
```
**View logs:**
```bash
docker-compose logs -f
```

---

## 🛡️ Rate Limiting
Limits each IP to **100 requests per 15 minutes**.

