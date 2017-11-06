const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Goods = require('../models/goods');
const User = require('../models/users');
const Common = require('../public/javascripts/common');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

mongoose.connection.on('connected', function () {
  console.log('mongodb connected.');
});

// 获取商品数据
router.post('/', function (req, res, next) {
  let query = req.body.params;

  let sort = parseInt(query.sort);
  let page = parseInt(query['page']);
  let pageSize = parseInt(query['size']);
  let skip = (page - 1) * pageSize;
  let ring = query['ring'];

  let params = {};
  if (ring) {
    params.salePrice = {
      $gte: ring.start,
      $lt: ring.end
    };
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  if (sort) {
    goodsModel.sort({'salePrice': sort});
  }

  goodsModel.exec((err, doc) => {
    if (err) {
      Common.resInfo(res, 1, err.messgae, '');
    } else {
      Common.resInfo(res, 0, '', {
        count: doc.length,
        list: doc
      });
    }
  });
});

// 添加到购物车
router.post('/addCar', (req, res, next) => {
  let userId = req.body.userId;
  let productId = req.body.productId;

  User.findOne({userId}, (err, userDoc) => {
    if (err) {
      Common.resInfo(res, 1, err.messgae, '');
    } else {
      Goods.findOne({productId}, (err, productDoc) => {
        if (err || !productDoc) {
          Common.resInfo(res, 1, err ? err.message : '数据不存在', '');
        } else {
          let exist = false;
          userDoc.cartList.forEach((item, index) => {
            if (item.productId === productId) {
              exist = true;
              userDoc.cartList[index].productNum++;
            }
          });

          if (!exist) {
            productDoc._doc.productNum = 1;
            productDoc._doc.checked = 1;
            userDoc.cartList.push(productDoc);
          }

          userDoc.save((err, saveDoc) => {
            if (err) {
              Common.resInfo(res, 1, err.messgae, '');
            } else {
              Common.resInfo(res, 0, '', {
                list: userDoc.cartList
              });
            }
          })
          ;
        }
      });
    }
  });
});

// 购物车
router.post('/getGoods', (req, res, next) => {
  let userId = req.body.userId;

  User.findOne({userId}, (err, doc) => {
    if (err || !doc) {
      Common.resInfo(res, 1, err ? err.message : '暂无数据', '');
    } else {
      Common.resInfo(res, 0, '', {
        list: doc.cartList
      });
    }
  });
});

// 删除购物车数据
router.post('/delCart', (req, res, next) => {
  let userId = req.body.userId;
  let productId = req.body.productId;

  User.update({userId: userId}, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, (err, doc) => {
    if (err) {
      Common.resInfo(res, 1, err.message, '');
    } else {
      Common.resInfo(res, 0, '', '');
    }
  });
});

// 更改购物车数据
router.post('/setCart', (req, res, next) => {
  let userId = req.body.userId;
  let productId = req.body.productId === undefined ? '' : req.body.productId;
  let allChecked = req.body.allChecked === undefined ? '' : req.body.allChecked;
  let params = req.body.params;

  User.findOne({userId}, (err, userDoc) => {
    if (err || !userDoc) {
      Common.resInfo(res, 1, err ? err.message : '数据不存在', '');
    } else {
      userDoc.cartList.forEach((item) => {
        if (productId !== '' && item.productId === productId) {
          for (let key in params) {
            item[key] = params[key];
          }
        }

        if (allChecked !== '') {
          item.checked = allChecked;
        }
      });

      userDoc.save((err, doc) => {
        if (err || !doc) {
          Common.resInfo(res, 1, err ? err.message : '数据不存在', '');
        } else {
          Common.resInfo(res, 0, '', {
            list: doc.cartList
          });
        }
      });
    }
  });
});

module.exports = router;
