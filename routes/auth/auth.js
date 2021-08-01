/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../model/user');

const { validateLoginDetails, validateUserDetails } = require('./validations.js');
const { getTokenByUserId } = require('../verifyToken');

// eslint-disable-next-line consistent-return
router.post('/register', async (req, res) => {
  const { username, email, password: plainTextPassword } = req.body;

  const { error } = validateUserDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(plainTextPassword, salt);

  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send('email already exist');
  const usernameExist = await User.findOne({ username });
  if (usernameExist) return res.status(400).send('username already exist');

  try {
    const response = await User.create({
      username,
      password,
      email,
    });
    const token = getTokenByUserId(response._id);
    res
      .header('auth-token', token)
      .json({ user_id: response._id });
  } catch (err) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send('Username already in use');
    }
    throw error;
  }
});

router.post('/login/', async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateLoginDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email }).lean();
  if (!user) return res.status(400).json('Email Does not exist');

  const IsPasswordValid = await bcrypt.compare(password, user.password);
  if (!IsPasswordValid) return res.status(400).json('Wrong Password!');

  const token = getTokenByUserId(user._id);
  return res
    .header('auth-token', token)
    .send('Logged in!');
});

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