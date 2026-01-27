import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail } from '../config/email.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, location, bio } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: role || 'user',
      phone: phone || '',
      location: location || '',
      bio: bio || ''
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      role: user.role,
      createdAt: user.createdAt,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();
    
    // Hash and store the code
    user.resetPasswordToken = crypto.createHash('sha256').update(verificationCode).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send email with verification code
    try {
      const emailResult = await sendVerificationEmail(email, verificationCode);
      
      console.log('✅ Verification Code:', verificationCode);
      console.log('📧 Email sent to:', email);
      if (emailResult.previewUrl) {
        console.log('🔗 Preview URL:', emailResult.previewUrl);
      }

      res.json({ 
        message: 'Verification code sent to your email',
        // For development/testing, include the code in response
        // Remove this in production!
        ...(process.env.NODE_ENV === 'development' && { 
          devCode: verificationCode,
          devNote: 'Code shown for development only. Check email or use this code.'
        }),
        previewUrl: emailResult.previewUrl
      });
    } catch (emailError) {
      console.error('❌ Email error:', emailError);
      
      // If email fails, still allow password reset by showing code in console
      console.log('⚠️  EMAIL FAILED - Verification Code:', verificationCode);
      
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      
      return res.status(500).json({ 
        message: 'Email could not be sent. Please check server logs for the verification code.',
        devCode: process.env.NODE_ENV === 'development' ? verificationCode : undefined
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
    
    const user = await User.findOne({
      email,
      resetPasswordToken: hashedCode,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    res.json({ 
      message: 'Code verified successfully',
      verified: true 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

    const user = await User.findOne({
      email,
      resetPasswordToken: hashedCode,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful! You can now login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    console.log('📝 Update profile request received');
    console.log('User ID:', req.user._id);
    console.log('Request body:', req.body);
    
    const { name, email, phone, location, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is already taken by another user
    if (email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        console.log('❌ Email already in use');
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone !== undefined ? phone : user.phone;
    user.location = location !== undefined ? location : user.location;
    user.bio = bio !== undefined ? bio : user.bio;
    await user.save();

    console.log('✅ Profile updated successfully');
    console.log('Updated user:', { name: user.name, email: user.email });

    const responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      role: user.role,
      createdAt: user.createdAt,
      token: generateToken(user._id)
    };

    console.log('📤 Sending response:', responseData);
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('❌ Update profile error:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
