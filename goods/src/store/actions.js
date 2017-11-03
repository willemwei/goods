import * as types from './mutation-types';

export let spliceCartList = ({state, commit}, {index}) => {
  let cartList = state.cartList.slice();
  cartList.splice(index, 1);

  commit(types.SET_CART_LIST, cartList);
};
