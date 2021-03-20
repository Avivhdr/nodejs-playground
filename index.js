const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const authRoute = require('./routes/auth/auth');
const postsRoute = require('./routes/posts/posts');

// Import Routes

dotenv.config();
dbConnect();

const app = express();
// Middleware
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(express.json());

// Routes Middlewares
app.use('/auth/', authRoute);
app.use('/posts/', postsRoute);
app.listen(9999, () => console.log('Server up at http://localhost:9999'));


