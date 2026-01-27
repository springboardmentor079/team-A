import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing Gmail Configuration...\n');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
console.log('\n');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test connection
console.log('📡 Testing SMTP connection...\n');
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Connection FAILED:', error.message);
    console.log('\nFull error:', error);
  } else {
    console.log('✅ Connection SUCCESS! Server is ready to send emails.\n');
    
    // Send test email
    const testEmail = process.argv[2] || process.env.EMAIL_USER;
    console.log('📧 Sending test email to:', testEmail, '\n');
    transporter.sendMail({
      from: `"CivicX Test" <${process.env.EMAIL_USER}>`,
      to: testEmail, // Send to specified email or yourself
      subject: 'Test Email from CivicX Platform',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #667eea;">✅ Email Configuration Working!</h2>
          <p>This is a test email from your CivicX platform.</p>
          <p>If you received this, your Gmail SMTP is configured correctly!</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
      text: 'Email configuration is working! Time: ' + new Date().toLocaleString()
    }, (err, info) => {
      if (err) {
        console.log('❌ Email sending FAILED:', err.message);
        console.log('\nFull error:', err);
      } else {
        console.log('✅ Email sent successfully!');
        console.log('📬 Message ID:', info.messageId);
        console.log('📮 Response:', info.response);
        console.log('\n🎉 Check the inbox at:', testEmail);
        console.log('\n💡 To test with another email, run: node test-email.js your@email.com');
      }
      process.exit(0);
    });
  }
});
