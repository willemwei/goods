const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const User = require('../models/users');
const Common = require('../public/javascripts/common');

Mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

// 登录
router.post('/login', (req, res, next) => {
  let params = req.body;

  User.findOne({
    userName: params.userName,
    userPwd: params.userPwd
  }, (err, doc) => {
    if (err || !doc) {
      Common.resInfo(res, 1, err ? err.message : '用户名或密码错误', '');
    } else {
      res.cookie('loginUser', {
        userId: doc.userId,
        userName: doc.userName
      }, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });

      Common.resInfo(res, 0, '', {
        userId: doc.userId,
        userName: doc.userName,
        cartList: doc.cartList,
        addressList: doc.addressList
      });
    }
  });
});

// 退出登录
router.post('/logOut', (req, res, next) => {
  res.clearCookie('loginUser');
  Common.resInfo(res, 0, '', '');
});

// 检查是否登录
router.post('/checkLog', (req, res, next) => {
  let logUser = req.cookies.loginUser;

  if (logUser) {
    User.findOne({
      userId: logUser.userId
    }, (err, doc) => {
      if (err || !doc) {
        Common.resInfo(res, 1, err ? err.message : '用户不存在', '');
      } else {
        Common.resInfo(res, 0, '', {
          userId: doc.userId,
          userName: doc.userName,
          cartList: doc.cartList,
          addressList: doc.addressList
        });
      }
    });
  } else {
    Common.resInfo(res, 1, '用户不存在', '');
  }
});

// 添加地址
router.post('/addAddress', (req, res, next) => {
  let userId = req.body.userId;
  let address = req.body.address;

  if (address) {
    address.isDefault = false;
    address.addressId = new Date().getTime();
  }

  User.findOne({userId}, (err, userDoc) => {
    if (err || !userDoc) {
      Common.resInfo(res, 1, err ? err.message : '用户不存在', '');
    } else {
      userDoc.addressList.push(address);

      userDoc.save((err, saveDoc) => {
        if (err) {
          Common.resInfo(res, 1, err.message, '');
        } else {
          Common.resInfo(res, 0, '', {
            addressList: saveDoc.addressList
          });
        }
      });
    }
  });
});

// 删除地址
router.post('/delAddress', (req, res, next) => {
  let userId = req.body.userId;
  let addressId = req.body.addressId;

  User.update({userId}, {
    $pull: {
      addressList: {
        addressId
      }
    }
  }, (err, doc) => {
    if (err || !doc) {
      Common.resInfo(res, 1, err ? err.messgae : '数据不存在', '');
    } else {
      User.findOne({userId}, (err, userDoc) => {
        if (err || !userDoc) {
          Common.resInfo(res, 1, err ? err.messgae : '用户不存在', '');
        } else {
          Common.resInfo(res, 0, '', {
            addressList: userDoc.addressList
          });
        }
      });
    }
  });
});

// 修改地址
router.post('/editAddress', (req, res, next) => {
  let userId = req.body.userId;
  let addressId = req.body.addressId;
  let addrDefault = req.body.addrDefault;
  let params = req.body.params;

  User.findOne({userId}, (err, userDoc) => {
    if (err || !userDoc) {
      Common.resInfo(res, 1, err ? err.messgae : '用户不存在', '');
    } else {
      if (addrDefault === undefined) {
        userDoc.addressList.forEach((item) => {
          if (item.addressId === addressId) {
            for (let k in params) {
              item[k] = params[k];
            }
          }
        });
      } else {
        userDoc.addressList.forEach((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });
      }

      userDoc.save((err, saveDoc) => {
        if (err) {
          Common.resInfo(res, 1, err.message, '');
        } else {
          Common.resInfo(res, 0, '', {
            addressList: saveDoc.addressList
          });
        }
      });
    }
  });
});

// 检测是否地址是否存在
router.post('/existAddr', (req, res, next) => {
  let userId = req.body.userId;
  let addressId = req.body.addressId;

  User.findOne({userId}, (err, userDoc) => {
    if (err || !userDoc) {
      Common.resInfo(res, 1, err ? err.message : '数据不存在', '');
    } else {
      let addr;

      userDoc.addressList.forEach((item) => {
        if (item.addressId === addressId) {
          addr = item;
        }
      });

      if (addr) {
        Common.resInfo(res, 0, '', {
          addressInfo: addr,
          cartList: userDoc.cartList
        });
      } else {
        Common.resInfo(res, 1, '数据不存在', '');
      }
    }
  });
});

// 添加订单
router.post('/addOrder', (req, res, next) => {
  let userId = req.body.userId;
  let params = req.body.params;
  let orderId = new Date().getTime().toString();
  let randomNum = Math.ceil(Math.random() * 9000 + 1000);

  params.createDate = new Date().toLocaleString();
  params.orderId = orderId + randomNum;
  params.orderStatus = 1;

  User.findOne({userId}, (err, userDoc) => {
    if (err || !userDoc) {
      Common.resInfo(res, 1, err ? err.message : '数据不存在', '');
    } else {
      userDoc.orderList.push(params);
      userDoc.save((err) => {
        if (err) {
          Common.resInfo(res, 1, err.message, '');
        } else {
          Common.resInfo(res, 0, '', {
            orderId: params.orderId
          });
        }
      });
    }
  });
});

module.exports = router;
