const express = require('express');
const Mongoose = require('mongoose');
const router = express.Router();
const Users = require('../models/users');

Mongoose.connection.on('connected', () => {
  console.log('Connected Success');
});

router.get('/', (req, res, next) => {
  let query = req.query;

  Users.find({userName: query.userName, userPwd: query.userPwd}, (err, doc) => {
    let logIsNot = false;

    if (err) {
      res.json({
        status: 1,
        msg: err.message
      });
    } else {
      if (doc.length >= 1) {
        logIsNot = true;
      }

      res.json({
        status: 0,
        msg: '',
        result: {
          logIsNot
        }
      });
    }
  });
});

module.exports = router;
