const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let userSchema = new Schema({
  userId: String,
  userName: String,
  userPwd: String,
  orderList: Array,
  cartList: [
    {
      productId: String,
      productName: String,
      salePrice: String,
      productImage: String,
      checked: Number,
      productNum: Number
    }
  ],
  addressList: [
    {
      addressId: String,
      userName: String,
      streetName: String,
      postCode: Number,
      tel: String,
      isDefault: Boolean
    }
  ]
});

module.exports = Mongoose.model('User', userSchema, 'users');
