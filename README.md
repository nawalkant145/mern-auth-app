# 🔐 AuthVault — Premium MERN Authentication System

AuthVault is a production-ready, full-stack authentication system built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It features a secure JWT-based authentication flow with access and refresh tokens, a high-fidelity "Glassmorphism" dark theme, and a premium SaaS-style user interface.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-purple)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

### 🔑 Advanced Authentication
- **Secure Signup** — Real-time validation, duplicate email check, and password hashing using **Bcrypt** (12 salt rounds).
- **JWT Session Management** — Short-lived **Access Tokens** (15 mins) for API security and long-lived **Refresh Tokens** (7 days) for seamless sessions.
- **Security-First Storage** — Refresh tokens are stored in **HttpOnly, Secure, and SameSite cookies** to prevent XSS and CSRF attacks.
- **Silent Refresh** — Integrated Axios interceptors automatically renew expired tokens in the background without interrupting the user.
- **One-Click Logout** — Invalidate sessions on both the server (database) and the client (clearing cookies).

### 🎨 Premium UI/UX (Glassmorphism)
- **Modern Dark Theme** — Sleek dark aesthetic with vibrant gradient accents and animated background blobs.
- **SaaS-Style Header** — Responsive navbar with:
  - Active link highlighting.
  - Animated notification bell with pulse effects.
  - Profile avatar with initial-based fallbacks.
  - Smooth-animated dropdown menu (Dashboard, Profile, Settings, Logout).
- **Micro-Animations** — Hover states, focus effects, and slide-in transitions for a premium feel.
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile with an animated hamburger menu.

---

## 🏗️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| **Frontend**   | React 19 (Vite) + React Router 7   |
| **Styling**    | Vanilla CSS (Glassmorphism Design)  |
| **Backend**    | Node.js + Express.js               |
| **Database**   | MongoDB (Mongoose ODM)             |
| **Auth**       | JWT + Bcryptjs + Cookie-Parser      |
| **Utilities**  | Axios (HTTP) + React Hot Toast      |

---

## 📁 Project Structure

```text
mern-auth-app/
├── server/                        # Node.js + Express Backend
│   ├── config/                    # DB connection logic
│   ├── controllers/               # Auth & User business logic
│   ├── middleware/                # JWT verification guards
│   ├── models/                    # Mongoose schemas (User)
│   ├── routes/                    # API endpoints (/api/auth, /api/user)
│   └── index.js                   # Server entry point
│
└── client/                        # React + Vite Frontend
    ├── src/
    │   ├── api/                   # Axios instance & interceptors
    │   ├── components/            # Navbar, ProtectedRoute
    │   ├── context/               # Global AuthContext provider
    │   ├── pages/                 # Landing, Login, Signup, Dashboard
    │   ├── index.css              # Global design system & animations
    │   └── App.jsx                # Client-side routing
    └── vite.config.js             # Proxy configuration
```

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
# Clone the repo
git clone https://github.com/yourusername/mern-auth-app.git
cd mern-auth-app

# Install Server dependencies
cd server && npm install

# Install Client dependencies
cd ../client && npm install
```

### 2. Environment Setup
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern-auth
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Run Locally
**Start Backend:**
```bash
cd server
node index.js
```

**Start Frontend:**
```bash
cd client
npm run dev
```

---

## 📡 API Endpoints

### Auth (Public)
- `POST /api/auth/signup` — Create a new account.
- `POST /api/auth/login` — Sign in and receive tokens.
- `POST /api/auth/refresh` — Get a new access token via cookie.
- `POST /api/auth/logout` — Clear session cookies.

### User (Protected)
- `GET /api/user/me` — Get current authenticated user details.
- `PUT /api/user/update` — Update user profile information.

---

## 🛠️ Security Checklist
- [x] Password hashing with **Bcrypt** (12 rounds).
- [x] **HttpOnly** cookies for Refresh Tokens.
- [x] JWT Access Tokens with short expiration.
- [x] **CORS** configuration with restricted origins.
- [x] Database-level token invalidation.
- [x] Axios Interceptors for safe token handling.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---


