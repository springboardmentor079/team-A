import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

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

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const testEmail = process.argv[2] || 'ds8383@srmist.edu.in';
const code = generateVerificationCode();

console.log('📧 Sending verification code to:', testEmail);
console.log('🔢 Verification Code:', code);
console.log('');

transporter.sendMail({
  from: `"CivicX Platform" <${process.env.EMAIL_USER}>`,
  to: testEmail,
  subject: 'Password Reset Verification Code - CivicX',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
        <h2 style="color: #ffffff; margin: 0;">CivicX Platform</h2>
      </div>
      
      <div style="padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
        <h3 style="color: #333;">Password Reset Request</h3>
        <p style="color: #666; line-height: 1.6;">Hello,</p>
        <p style="color: #666; line-height: 1.6;">
          You requested to reset your password for your CivicX account. 
          Use the verification code below to proceed:
        </p>
        
        <div style="background: #f5f7fa; padding: 25px; border-radius: 10px; text-align: center; margin: 25px 0; border: 2px dashed #667eea;">
          <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">Your Verification Code</p>
          <h1 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0; font-weight: bold;">${code}</h1>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <p style="color: #856404; margin: 0; font-size: 14px;">
            ⏰ <strong>This code will expire in 10 minutes.</strong>
          </p>
        </div>
        
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          If you didn't request this password reset, please ignore this email or 
          contact our support team if you have concerns about your account security.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;">
        
        <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 0;">
          <strong>CivicX Platform</strong> - Empowering Citizens, Strengthening Democracy<br>
          This is an automated message, please do not reply to this email.
        </p>
      </div>
    </div>
  `,
  text: `CivicX Platform - Password Reset\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`
}, (err, info) => {
  if (err) {
    console.log('❌ Email sending FAILED:', err.message);
  } else {
    console.log('✅ Verification code email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📮 Response:', info.response);
    console.log('');
    console.log('🎉 Check your inbox at:', testEmail);
    console.log('🔢 Your code is:', code);
  }
  process.exit(0);
});
