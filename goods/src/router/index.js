import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/goods';
import Cart from '@/components/cart/cart';
import Address from '@/components/address/address';
import SelectAddress from '@/components/select-address/select-address';
import PreviewOrder from '@/components/preview-order/preview-order';
import OrderSuccess from '@/components/order-success/order-success';

Vue.use(Router);

export default new Router({
  mode: 'history', // history hash
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/address',
      component: Address,
      children: [
        {
          path: '',
          component: SelectAddress
        },
        {
          path: 'preview',
          component: PreviewOrder
        },
        {
          path: 'success',
          component: OrderSuccess
        }
      ]
    }
  ]
});
