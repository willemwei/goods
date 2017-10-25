// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import LazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;

Vue.use(LazyLoad, {
  loading: '/static/images/loading.gif',
  error: '/static/images/no-image.png'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
