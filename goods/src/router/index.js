import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/goods';

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
    }
  ]
});
