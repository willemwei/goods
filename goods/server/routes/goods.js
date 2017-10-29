var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Goods = require('../models/goods');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

mongoose.connection.on('connected', function () {
  console.log('mongodb connected.');
});

router.get('/', function (req, res, next) {
  let sort = parseInt(req.param('sort'));
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('size'));
  let skip = (page - 1) * pageSize;

  let params = {};

  let goodsModel = Goods.find({}).skip(skip).limit(pageSize);
  if (sort) {
    goodsModel.sort({'salePrice': sort});
  }

  goodsModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

module.exports = router;
