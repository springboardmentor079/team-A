import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('=== ENVIRONMENT VARIABLES ===');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
console.log('\n');

console.log('=== CREATING TRANSPORTER ===');
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
  },
  debug: true, // Enable debug output
  logger: true  // Log to console
});

console.log('Transporter options:', transporter.options);
console.log('\n');

console.log('=== TESTING CONNECTION ===');
transporter.verify(function (error, success) {
  if (error) {
    console.log('❌ Connection FAILED:', error);
  } else {
    console.log('✅ Connection SUCCESS!');
    console.log('\n=== SENDING TEST EMAIL ===');
    
    transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Debug Test',
      text: 'Testing which SMTP server is being used'
    }, (err, info) => {
      if (err) {
        console.log('❌ Send FAILED:', err);
      } else {
        console.log('✅ Email sent!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
        console.log('Envelope:', info.envelope);
      }
      process.exit(0);
    });
  }
});
