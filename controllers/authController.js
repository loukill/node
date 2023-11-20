
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing
import User from '../models/user.js'; // Import your user model


function generateResetCode() {
  return Math.floor(10000 + Math.random() * 90000);
}

const router = express.Router();
//Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

console.log('Received credentials:', email, password);

try {
  const user = await User.findOne({ email });

  console.log('User found:', user);
  
  if (!user) {
    console.log('User not found:', email);
    return res.status(401).json({ message: 'Invalid credentials email' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  console.log('Password comparison result:', isPasswordValid);
 

  if (!isPasswordValid) {
    console.log('Invalid password for user:', email);
    return res.status(401).json({ message: 'Invalid credentials password' });
  }

 // Generate JWT token
 const token = jwt.sign({ user: { id: user._id, role: user.role } }, 'your-secret-key', { expiresIn: '1h' });

 // Log the generated token
 console.log('JWT token:', token);

 // Send the token in the response
 res.json(user);
} catch (error) {
 console.error(error);
 res.status(500).json({ message: 'Internal Server Error' });
}
});



// Logout route
router.post('/logout', (req, res) => {
  
  res.json({ message: 'Logout successful' });
});


///



export default router;
