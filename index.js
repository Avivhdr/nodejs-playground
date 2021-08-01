/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');

const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to DB
require('./config/db')();

// Middleware
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Express session
app.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Views
app.get('/', (req, res) => {
  res.render('index', { name: 'visitor' });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// Routes
app.use('/auth', require('./routes/auth-passport/auth'));

app.listen(9999, () => console.log('Server up at http://localhost:9999'));
