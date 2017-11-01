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
      res.cookie('loginUser', {
        userId: doc.userId,
        userName: doc.userName
      }, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.json({
        status: 0,
        msg: '',
        result: {
          userId: doc.userId,
          userName: doc.userName
        }
      });
    }
  });
});

router.post('/logOut', (req, res, next) => {
  res.clearCookie('loginUser');
  res.json({
    status: 0,
    msg: '',
    result: ''
  });
});

router.post('/checkLog', (req, res, next) => {
  if (req.cookies.loginUser) {
    res.json({
      status: 0,
      msg: '',
      result: req.cookies.loginUser
    });
  } else {
    Base.errData(res, '用户未登录');
  }
});

module.exports = router;
