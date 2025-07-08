const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with env var in prod

// Connect to MongoDB
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log("MongoDB connected"))
.catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  passwordHash: String,
  cart: { type: Array, default: [] },   // store cart items here
  orders: { type: Array, default: [] }  // store order history
});

const User = mongoose.model('User', userSchema);

// Signup route with added logging and error handling
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log('Signup failed: Missing fields');
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('Signup failed: User already exists', existingUser);
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    console.log('New user saved:', newUser);
    res.json({ message: 'User created successfully' });

  } catch (err) {
    console.error('Error saving new user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route (unchanged)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Please fill all fields' });

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const validPass = await bcrypt.compare(password, user.passwordHash);
  if (!validPass) return res.status(400).json({ message: 'Invalid credentials' });

  // Create JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, username: user.username });
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization required' });

  const token = authHeader.split(' ')[1]; // Bearer <token>

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user's cart
app.get('/api/cart', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.cart);
});

// Update user's cart
app.post('/api/cart', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  user.cart = req.body.cart || [];
  await user.save();
  res.json({ message: 'Cart updated' });
});

// Get orders
app.get('/api/orders', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.orders);
});

// Create order
app.post('/api/orders', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  const newOrder = req.body.order; // expected to be an object with order details
  user.orders.push(newOrder);
  user.cart = []; // clear cart after order
  await user.save();
  res.json({ message: 'Order placed' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
