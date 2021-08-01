const express = require('express');

const app = express();
function middelware1(req, res, next) {
  console.log('Hello from middelware #1'); // eslint-disable-line no-console
  next();
}
function middelware2(req, res, next) {
  console.log('Hello from middelware #2'); // eslint-disable-line no-console
  const err = new Error('I am an error');

  // next();
  next(err);
}
function middelware3(req, res, next) {
  console.log('Hello from middelware #3'); // eslint-disable-line no-console
  next();
}
function errorMiddleware(err, req, res, next) {
  console.log('Hello from errorMiddleware'); // eslint-disable-line no-console
  if (err) {
    res.send('<h1> Error from errorMiddleware </h1>');
  } else {
    next();
  }
}

app.use(middelware1);
app.use(middelware2);
app.use(middelware3);

app.get('/', (req, res) => {
  console.log('Hello from "/"'); // eslint-disable-line no-console
  res.send('<h1>Hello from "/"</h1>');
});

app.use(errorMiddleware); // error handler should be last

app.listen(3000, () => console.log('App listen on 3000'));
