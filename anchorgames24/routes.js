const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./models/user');
const Product = require('./models/product');
const Category = require('./models/category');
const Cart = require('./models/cart');
const roleMiddleware = require('./middleware/roleMiddleware'); // Import role middleware

// JWT secret key
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Static data for pages (this could be dynamic from a database in a real app)
const tradingCardsData = [
  { name: 'MLB Rookie Card Pack', price: 5.99, imageUrl: '/images/mlb.jpg' },
  { name: 'NBA Card Pack', price: 6.99, imageUrl: '/images/nba.jpg' },
  { name: 'Pokemon Card Pack', price: 8.99, imageUrl: '/images/pokemon.jpg' },
  { name: 'Yu-Gi Oh Card Pack', price: 8.99, imageUrl: '/images/yugioh.jpg' }
];

const boardGamesData = [
  { name: 'Monopoly', price: 19.99, imageUrl: '/images/monopoly.jpg' },
  { name: 'Candyland', price: 24.99, imageUrl: '/images/candyland.jpg' },
  { name: 'Chess', price: 20.99, imageUrl: '/images/chess.jpg' },
  { name: 'Risk', price: 22.99, imageUrl: '/images/risk.jpg' }
];

const videoGamesData = [
  { name: 'Call of Duty', price: 49.99, imageUrl: '/images/call_of_duty.jpg' },
  { name: 'Madden 23', price: 39.99, imageUrl: '/images/madden_23.jpg' },
  { name: 'Fifa 23', price: 59.99, imageUrl: '/images/fifa_23.jpg' },
  { name: 'Minecraft', price: 26.99, imageUrl: '/images/minecraft.jpg' }
];

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    res.send({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Protected route example
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({ message: 'You are authenticated', user: req.user });
});

// Admin-only route example
router.get('/admin', passport.authenticate('jwt', { session: false }), roleMiddleware(['admin']), (req, res) => {
  res.send({ message: 'Admin access granted' });
});

// Helper function to apply filters
const applyFilters = (data, filters) => {
  return data.filter(item => {
    return (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
           (!filters.minPrice || item.price >= parseFloat(filters.minPrice)) &&
           (!filters.maxPrice || item.price <= parseFloat(filters.maxPrice));
  });
};

// Define routes for static pages
router.get('/admin', passport.authenticate('jwt', { session: false }), roleMiddleware(['admin']), (req, res) => {
  res.send({ message: 'Admin access granted' });
});

router.get('/', (req, res) => {
  res.render('home', { title: 'Anchor Games' });
});

router.get('/trading-cards', (req, res) => {
  const filters = req.query;
  const filteredTradingCards = applyFilters(tradingCardsData, filters);

  res.render('trading-cards', { title: 'Trading Cards', products: filteredTradingCards, query: filters });
});

router.get('/board-games', (req, res) => {
  const filters = req.query;
  const filteredBoardGames = applyFilters(boardGamesData, filters);

  res.render('board-games', { title: 'Board Games', products: filteredBoardGames, query: filters });
});

router.get('/video-games', (req, res) => {
  const filters = req.query;
  const filteredVideoGames = applyFilters(videoGamesData, filters);

  res.render('video-games', { title: 'Video Games', products: filteredVideoGames, query: filters });
});

// CRUD operations for products
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/products/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'price', 'description', 'imageUrl'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send();
    }

    res.send(product);
  } catch (error) {
    res.status(500).send();
  }
});

// Cart operations
router.post('/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { productId, name, price } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, name, price });
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: 'Error adding item to cart' });
  }
});

router.get('/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');

    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    res.render('cart', { title: 'Shopping Cart', items: cart.items, total: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0) });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching cart' });
  }
});

router.delete('/cart/:itemId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send({ error: 'Error removing item from cart' });
  }
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Create Account page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Create Account' });
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
