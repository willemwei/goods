<template>
  <div>
    这是商品列表页面
    <div>
      <router-link v-bind:to="{name: 'title'}">Title</router-link>
      <router-link to="/image">Image</router-link>
    </div>
    <button @click="jump">购物车</button>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      jump () {
        this.$router.push({path: '/Cart?goodsId=123'});
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
</style>
