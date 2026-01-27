# Production Email Setup Guide

## 🚀 Choose Your Email Service

### Option 1: Gmail (Easiest - Free)

**Best for:** Small projects, personal use

**Setup Steps:**
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)"
5. Copy the 16-character password

**Update server/.env:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
```

**Limits:** 500 emails/day

---

### Option 2: SendGrid (Recommended)

**Best for:** Professional projects, high deliverability

**Setup Steps:**
1. Sign up at https://signup.sendgrid.com/
2. Verify your email address
3. Go to Settings → API Keys
4. Click "Create API Key"
5. Give it a name and select "Full Access"
6. Copy the API key (you won't see it again!)

**Update server/.env:**
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=SG.your-sendgrid-api-key-here
```

**Limits:** 
- Free: 100 emails/day
- Paid: Starting at $19.95/month for 40,000 emails

---

### Option 3: Mailgun

**Best for:** Developers, API-first approach

**Setup Steps:**
1. Sign up at https://signup.mailgun.com/
2. Verify your email
3. Go to Sending → Domains
4. Use sandbox domain or add your own
5. Go to Domain Settings → SMTP Credentials
6. Copy username and password

**Update server/.env:**
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASS=your-mailgun-password
```

**Limits:** 5,000 emails/month (free)

---

### Option 4: Brevo (Sendinblue)

**Best for:** Marketing emails + transactional

**Setup Steps:**
1. Sign up at https://app.brevo.com/account/register
2. Verify your email
3. Go to SMTP & API → SMTP
4. Copy your SMTP credentials

**Update server/.env:**
```env
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your-brevo-email@example.com
EMAIL_PASS=your-smtp-key
```

**Limits:** 300 emails/day (free)

---

## 🔧 Switching to Production

### Step 1: Choose a service from above

### Step 2: Update server/.env file
Replace the Ethereal credentials with your production credentials

### Step 3: Update email.js
Replace the content of `server/config/email.js` with `server/config/email.production.js`

Or simply run:
```bash
cp server/config/email.production.js server/config/email.js
```

### Step 4: Test the email
1. Restart your server
2. Try the forgot password feature
3. Check if email arrives in inbox (not spam)

---

## 📊 Comparison Table

| Service   | Free Limit      | Paid Starting | Best For          |
|-----------|----------------|---------------|-------------------|
| Gmail     | 500/day        | N/A           | Small projects    |
| SendGrid  | 100/day        | $19.95/mo     | Professional      |
| Mailgun   | 5,000/month    | $35/mo        | Developers        |
| Brevo     | 300/day        | $25/mo        | Marketing         |

---

## 🔒 Security Tips

1. **Never commit .env file** - Already in .gitignore
2. **Use App Passwords** - Not your main password
3. **Rotate keys regularly** - Change every 3-6 months
4. **Monitor usage** - Check for unusual activity
5. **Use environment variables** - Never hardcode credentials

---

## 🐛 Troubleshooting

**Email not sending?**
- Check credentials are correct
- Verify 2FA is enabled (Gmail)
- Check spam folder
- Verify domain (SendGrid/Mailgun)
- Check daily limits

**"Authentication failed" error?**
- Double-check username/password
- Ensure App Password is used (Gmail)
- Verify API key is correct (SendGrid)

**Emails going to spam?**
- Add SPF/DKIM records
- Verify sender domain
- Use professional email content
- Avoid spam trigger words

---

## 📞 Support Links

- Gmail: https://support.google.com/mail
- SendGrid: https://docs.sendgrid.com/
- Mailgun: https://documentation.mailgun.com/
- Brevo: https://help.brevo.com/
