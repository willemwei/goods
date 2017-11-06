const state = {
  user: {},
  cartList: [],
  addressList: [],
  orderProcess: 0,
  alert: {
    show: false,
    msg: '你当前未登录!'
  },
  orderPreview: {
    orderTotal: 0,
    addressInfo: {},
    goodsList: []
  }
};

export default state;
