import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Email Configuration
// For testing: Uses Ethereal (fake emails)
// For production: Uses Gmail or Brevo (real emails)

console.log('🔧 Loading email config...');
console.log('EMAIL_HOST from env:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT from env:', process.env.EMAIL_PORT);
console.log('EMAIL_USER from env:', process.env.EMAIL_USER);

const isProduction = process.env.EMAIL_HOST !== 'smtp.ethereal.email';

const transporterConfig = {
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'tracey.torphy@ethereal.email',
    pass: process.env.EMAIL_PASS || '1tEacfXw7nBR1P9mnk'
  },
  tls: {
    rejectUnauthorized: false
  }
};

console.log('🔧 Transporter config:', {
  host: transporterConfig.host,
  port: transporterConfig.port,
  user: transporterConfig.auth.user
});

const transporter = nodemailer.createTransport(transporterConfig);

// Verify connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Email configuration error:', error.message);
    console.log('Full error:', error);
  } else {
    if (isProduction) {
      console.log('✅ REAL Email server is ready - Emails will be sent to actual inboxes!');
      console.log('📧 Sending from:', process.env.EMAIL_USER);
    } else {
      console.log('✅ TEST Email server is ready - Using Ethereal (fake emails)');
      console.log('📧 Preview emails in console');
    }
  }
});

export const sendVerificationEmail = async (email, code) => {
  try {
    console.log('🚀 Starting email send process...');
    console.log('📧 To:', email);
    console.log('🔢 Code:', code);
    console.log('📤 From:', process.env.EMAIL_USER);
    
    const fromEmail = process.env.EMAIL_USER || 'tracey.torphy@ethereal.email';
    
    const info = await transporter.sendMail({
      from: `"CivicX Platform" <${fromEmail}>`,
      to: email,
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
    });

    console.log('✅ Email sent successfully to:', email);
    console.log('📧 Verification Code:', code);
    console.log('📬 Message ID:', info.messageId);
    console.log('📮 Response:', info.response);
    
    // For Ethereal, show preview URL
    if (!isProduction) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log('🔗 Preview URL:', previewUrl);
      }
    }
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: isProduction ? null : nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    console.error('Full error:', error);
    throw new Error('Failed to send email: ' + error.message);
  }
};

export default transporter;
