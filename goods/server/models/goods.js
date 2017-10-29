const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  'productId': {type: String},
  'productName': {type: String},
  'salePrice': {type: Number},
  'productImage': {type: String}
});

module.exports = mongoose.model('Good', productSchema, 'goods'); // 自动加s进行关联
