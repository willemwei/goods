import * as types from './mutation-types';

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user;
  },
  [types.SET_CART_LIST] (state, cartList) {
    state.cartList = cartList;
  },
  [types.SET_ORDER_PROCESS] (state, orderProcess) {
    state.orderProcess = orderProcess;
  },
  [types.SET_ADDRESS_LIST] (state, addressList) {
    state.addressList = addressList;
  },
  [types.SET_ALERT] (state, alert) {
    state.alert = alert;
  },
  [types.SET_ORDER_PREVIEW] (state, {totalPrice = 0, addressInfo = {}, goodsList = []}) {
    state.orderPreview = {
      totalPrice: totalPrice,
      addressInfo,
      goodsList
    };
  }
};

export default mutations;
