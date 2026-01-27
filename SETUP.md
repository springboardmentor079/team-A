# CivicX Platform - Setup Instructions

## 🚀 Quick Setup (5 Minutes)

### Prerequisites
- Node.js installed (v18 or higher)
- Internet connection

---

## 📦 Installation Steps

### Step 1: Install Dependencies

**Install Frontend Dependencies:**
```bash
npm install
```

**Install Backend Dependencies:**
```bash
cd server
npm install
cd ..
```

---

### Step 2: Run the Application

**Option A: Run Both (Recommended)**

Open **TWO terminal windows**:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Wait for: `✅ MongoDB Connected` and `✅ Email server is ready`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Wait for: `Local: http://localhost:5173/`

**Option B: Use NPM Scripts**

**Terminal 1:**
```bash
npm run server
```

**Terminal 2:**
```bash
npm run dev
```

---

### Step 3: Open in Browser

Go to: **http://localhost:5173/**

---

## 🐛 Troubleshooting

### Issue: "MongoDB Connection Error"

**Error Message:**
```
Error: Could not connect to any servers in your MongoDB Atlas cluster
```

**Solution:**
Contact the project owner to whitelist your IP address in MongoDB Atlas.

**Or get your IP:**
1. Go to: https://www.whatismyip.com/
2. Copy your IP address
3. Send it to the project owner

---

### Issue: "Port Already in Use"

**Backend (Port 5000):**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 5173):**
```bash
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

---

### Issue: "Module Not Found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for server
cd server
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Project Structure

```
civix-frontend/
├── src/                    # Frontend React code
│   ├── pages/             # All pages (Login, Dashboard, etc.)
│   ├── components/        # Reusable components
│   └── api/               # API configuration
├── server/                # Backend Node.js code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   └── config/            # Configuration files
└── README.md              # Project documentation
```

---

## 🌐 URLs

- **Frontend:** http://localhost:5173/
- **Backend API:** http://localhost:5000/
- **API Test:** http://localhost:5000/ (should show "Civic Engagement Platform API")

---

## ✅ Features

- User Registration & Login
- Admin Registration & Login
- Create Petitions (Users)
- Sign Petitions (Admins only)
- Create & Vote on Polls (Everyone)
- Report Issues with Images
- Forgot Password with Email Verification
- Dashboard with Statistics

---

## 🔑 Default Accounts

**Create your own accounts using the registration pages:**
- User Registration: http://localhost:5173/register
- Admin Registration: http://localhost:5173/admin/register
  - Admin Secret Code: `ADMIN2024`

---

## 📧 Email Testing

The forgot password feature uses Ethereal (fake email service for testing).
- Verification codes appear in the console
- Preview URLs are shown in the backend terminal

---

## 🆘 Need Help?

If you encounter any issues:
1. Make sure both backend and frontend are running
2. Check the terminal for error messages
3. Verify MongoDB connection is successful
4. Contact the project owner for IP whitelisting

---

## 🎉 You're All Set!

Visit http://localhost:5173/ and start exploring the CivicX Platform!
