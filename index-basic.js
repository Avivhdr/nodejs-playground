if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const dbConnect = require('./config/db');
const authRoute = require('./routes/auth/auth');

const postsRoute = require('./routes/posts/posts');

// Import Routes
dbConnect();

const app = express();
// Middleware
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Views
app.get('/', (req, res) => {
  res.render('index', { name: 'Aviv' });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

// Routes
app.use('/auth/', authRoute);

app.use('/posts/', postsRoute);

app.listen(9999, () => console.log('Server up at http://localhost:9999'));
