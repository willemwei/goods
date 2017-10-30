const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const User = require('../models/users');

Mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

router.post('/login', (req, res, next) => {
  let params = req.body;

  User.find({
    userName: params.userName,
    userPwd: params.userPwd
  }, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      });
    } else {
      res.json({
        status: 0,
        msg: '',
        result: doc.length > 0
      });
    }
  });
});

module.exports = router;
