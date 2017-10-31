const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const User = require('../models/users');
const Base = require('../public/javascripts/base');

Mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

router.post('/login', (req, res, next) => {
  let params = req.body;

  User.findOne({
    userName: params.userName,
    userPwd: params.userPwd
  }, (err, doc) => {
    if (err || !doc) {
      Base.errData(res, err ? err.message : '用户名或密码错误');
    } else {
      res.json({
        status: 0,
        msg: '',
        result: doc.userId
      });
    }
  });
});

module.exports = router;
