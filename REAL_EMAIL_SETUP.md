# Send Real Emails - Quick Setup

## 🎯 Best Option: Brevo (Free 300 emails/day)

### Step 1: Create Brevo Account (2 minutes)

1. Go to: https://app.brevo.com/account/register
2. Sign up with your email
3. Verify your email address
4. Login to Brevo dashboard

### Step 2: Get SMTP Credentials (1 minute)

1. Click your name (top right)
2. Click **"SMTP & API"**
3. Click **"SMTP"** tab
4. You'll see:
   - **SMTP Server:** smtp-relay.brevo.com
   - **Port:** 587
   - **Login:** your-email@example.com
   - **SMTP Key:** (click "Create a new SMTP key")

5. Click **"Create a new SMTP key"**
6. Give it a name: "CivicX Platform"
7. **Copy the SMTP key** (looks like: `xsmtpsib-a1b2c3d4...`)

### Step 3: Update Your .env File

Open `server/.env` and update:

```env
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-smtp-key-here
```

### Step 4: Restart Server

```bash
cd server
# Press Ctrl+C to stop
npm run dev
```

### Step 5: Test It!

1. Go to: http://localhost:5173/forgot-password
2. Enter a REAL email address (yours or friend's)
3. Click "Send Verification Code"
4. Check the email inbox - REAL email will arrive! 🎉

---

## 🎯 Alternative: Gmail (If you have personal Gmail)

### Step 1: Enable 2-Step Verification

1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification"

### Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Type: "CivicX Platform"
4. Click "Generate"
5. Copy the 16-character password

### Step 3: Update .env

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-personal-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
```

### Step 4: Restart & Test

```bash
cd server
npm run dev
```

---

## ⚡ Quick Comparison

| Service | Free Limit | Setup Time | Best For |
|---------|-----------|------------|----------|
| Brevo | 300/day | 3 min | Everyone |
| Gmail | 500/day | 5 min | Personal projects |
| SendGrid | 100/day | 5 min | Professional |

---

## 🐛 Troubleshooting

### Brevo: "Authentication failed"
- Make sure you copied the SMTP key correctly
- Use the email you signed up with as EMAIL_USER

### Gmail: "Invalid credentials"
- Use personal Gmail, not institutional email
- Make sure 2FA is enabled first
- Use App Password, not regular password

### Emails going to spam
- This is normal for new accounts
- Ask recipients to mark as "Not Spam"
- After a few emails, deliverability improves

---

## ✅ Recommended: Brevo

**Why Brevo?**
- ✅ No phone verification needed
- ✅ 300 free emails per day
- ✅ Works immediately
- ✅ Better deliverability than Gmail
- ✅ Professional email service

**Sign up now:** https://app.brevo.com/account/register
