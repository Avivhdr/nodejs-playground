import express from 'express'
const router = express.Router()

import Queue from '../services/Queue';

const queueInstance = new Queue()

// Initializing with dummy data
queueInstance.data = ['a', 'b', 'c']

const x = async (x) => {
  return x * 2;
};

// Get queue snapshot
router.get('/', function (req, res) {
  const snapShot = queueInstance.data;
  // res.set({
  //   'content-type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true',
  //   'Content-Length': '40724',
  // });
  res.json(snapShot)
})

// Add Item to queue
router.post('/enqueue', function (req, res) {
  queueInstance.enqueue(req.body.value);
  // res.set({
  //   'content-type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true',
  //   'Content-Length': '40724',
  // });
  res.json({ msg: "success" });
})

// Extract item from queue
router.delete('/dequeue', function (req, res) {
  const headElement = queueInstance.dequeue();
  // res.set({
  //   'content-type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true',
  //   'Content-Length': '40724',
  // });
  if (headElement) {
    res.json({ msg: "success", data: headElement });
  } else {
    res.json({ msg: "queue was empty!" });
  }
})

module.exports = router
