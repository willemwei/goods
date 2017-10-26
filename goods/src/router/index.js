import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/goods';
import Cart from '@/components/cart/cart';

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
    }
  ]
});
