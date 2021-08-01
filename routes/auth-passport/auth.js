/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../../model/user');
const { forwardAuthenticated } = require('../../config/auth');
const { validateLoginDetails, validateUserDetails } = require('./validations.js');
const { getTokenByUserId } = require('../verifyToken');

router.post('/register', async (req, res) => {
  const { email, password: plainTextPassword } = req.body;

  const { error } = validateUserDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(plainTextPassword, salt);

  const emailExist = await User.findOne({ email }).lean();
  if (emailExist) return res.status(400).send('email already exist');

  try {
    const response = await User.create({
      email,
      password,
    });
    // const token = getTokenByUserId(response._id);
    res
      .redirect('/auth/login');
    // .header('auth-token', token)
    // .json({ user_id: response._id })
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .send('Email already exist in DB');
    }
    throw new Error(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
});

// router.post('/login/', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true,
// }));

module.exports = router;

// app.post('/api/change-password', async (req, res) => {
//   const { token, newpassword: plainTextPassword } = req.body

//   if (!plainTextPassword || typeof plainTextPassword !== 'string') {
//     return res.json({ status: 'error', error: 'Invalid password' })
//   }

//   if (plainTextPassword.length < 5) {
//     return res.json({
//       status: 'error',
//       error: 'Password too small. Should be atleast 6 characters'
//     })
//   }

//   try {
//     const user = jwt.verify(token, JWT_SECRET)

//     const _id = user.id

//     const password = await bcrypt.hash(plainTextPassword, 10)

//     await User.updateOne(
//       { _id },
//       {
//         $set: { password }
//       }
//     )
//     res.json({ status: 'ok' })
//   } catch (error) {
//     console.log(error)
//     res.json({ status: 'error', error: ';))' })
//   }
// })
