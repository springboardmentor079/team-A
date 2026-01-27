import nodemailer from 'nodemailer';

// Production Email Configuration
// Choose one of the following services and update your .env file

// OPTION 1: Gmail
// EMAIL_HOST=smtp.gmail.com
// EMAIL_PORT=587
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-16-char-app-password

// OPTION 2: SendGrid
// EMAIL_HOST=smtp.sendgrid.net
// EMAIL_PORT=587
// EMAIL_USER=apikey
// EMAIL_PASS=your-sendgrid-api-key

// OPTION 3: Mailgun
// EMAIL_HOST=smtp.mailgun.org
// EMAIL_PORT=587
// EMAIL_USER=postmaster@your-domain.mailgun.org
// EMAIL_PASS=your-mailgun-password

// OPTION 4: Brevo (Sendinblue)
// EMAIL_HOST=smtp-relay.brevo.com
// EMAIL_PORT=587
// EMAIL_USER=your-brevo-email
// EMAIL_PASS=your-smtp-key

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export const sendVerificationEmail = async (email, code) => {
  try {
    const info = await transporter.sendMail({
      from: `"CivicX Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Verification Code - CivicX',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">CivicX Platform - Password Reset</h2>
          <p>Hello,</p>
          <p>You requested to reset your password. Use the verification code below:</p>
          <div style="background: #f5f7fa; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
            <h1 style="color: #667eea; font-size: 32px; letter-spacing: 5px; margin: 0;">${code}</h1>
          </div>
          <p><strong>This code will expire in 10 minutes.</strong></p>
          <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            CivicX Platform - Empowering Citizens<br>
            This is an automated message, please do not reply.
          </p>
        </div>
      `,
      text: `CivicX Platform - Password Reset\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`
    });

    console.log('Email sent successfully: %s', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
};

export default transporter;
