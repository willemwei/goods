<template>
  <div class="cart-control">
    <div class="item" @click="subtracte">-</div>
    <div class="num">{{ goods.count ? goods.count : 1 }}</div>
    <div class="item" @click="addite">+</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      goods: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    methods: {
      subtracte () {
        if (this.goods.count > 1) {
          this.goods.count--;
        } else {
          Vue.set(this.goods, 'count', 1);
        }
      },
      addite () {
        if (!this.goods.count) {
          Vue.set(this.goods, 'count', 1);
        }
        this.goods.count++;
      }
    }
  };
</script>

<style lang="less" scoped>
  .cart-control {
    display: inline-flex;
    border: 1px solid #f0f0f0;
    height: 28px;
    font-size: 16px;
    line-height: 28px;

    .item {
      flex: 0 0 40px;
      width: 40px;
      color: #605f5f;
      background-color: rgb(240, 240, 240);
      cursor: pointer;
      user-select: none;
    }

    .num {
      min-width: 40px;
      text-align: center;
      background-color: #fff;
    }
  }
</style>
