import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Checking Environment Variables:\n');
console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not Set');
console.log('PORT:', process.env.PORT || '5000');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('\n📧 Email Configuration:');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST || '❌ Not Set');
console.log('EMAIL_PORT:', process.env.EMAIL_PORT || '❌ Not Set');
console.log('EMAIL_USER:', process.env.EMAIL_USER || '❌ Not Set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set (***' + process.env.EMAIL_PASS.slice(-4) + ')' : '❌ Not Set');
console.log('\n');

if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log('⚠️  WARNING: Email configuration is incomplete!');
  console.log('Make sure server/.env file has:');
  console.log('EMAIL_HOST=smtp.gmail.com');
  console.log('EMAIL_PORT=587');
  console.log('EMAIL_USER=your@gmail.com');
  console.log('EMAIL_PASS=your_app_password');
} else {
  console.log('✅ All email configuration variables are set!');
}
