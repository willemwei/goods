<template>
  <transition-group class="cart-list w1260" tag="ul" name="list">
    <li class="header" key="header">
      <div class="text">商品名</div>
      <div class="text">单价</div>
      <div class="text">数量</div>
      <div class="text">价格</div>
      <div class="text" v-if="op">操作项</div>
    </li>
    <li class="item" v-for="item in cartList" :key="item.productId">
      <div class="text">
        <span class="radio-group" :class="{'active': item.checked}" @click="setChecked(item)" v-if="check"></span>
        <img class="pic" :src="'/static/images/' + item.productImage" width="78" height="78">
        <span class="name">{{ item.productName }}</span>
      </div>
      <div class="text">￥{{ formatM(item.salePrice * 1) }}</div>
      <div class="text">
        <v-cart-control :goods="item" @countEdit="countEdit(item)" v-if="control"></v-cart-control>
        <span v-else class="num">×{{ item.productNum }}</span>
      </div>
      <div class="text price">￥{{ formatM(item.productNum * item.salePrice) }}</div>
      <div class="text" v-if="op">
        <i class="icon-delete" @click="deleteItem(item)"></i>
      </div>
    </li>
  </transition-group>
</template>

<script type="text/ecmascript-6">
  import CartControl from '@/base/cart-control/cart-control';
  import { formatMoney } from '@/common/js/format';

  export default {
    props: {
      cartList: {
        type: Array,
        default () {
          return [];
        }
      },
      check: {
        default: true
      },
      op: {
        default: true
      },
      control: {
        default: true
      }
    },
    components: {
      'v-cart-control': CartControl
    },
    methods: {
      setChecked (item) {
        this.$emit('setChecked', item);
      },
      countEdit (item) {
        this.$emit('countEdit', item);
      },
      deleteItem (item) {
        this.$emit('deleteItem', item);
      },
      formatM(num) {
        return formatMoney(num);
      }
    }
  };
</script>

<style lang="less" scoped>
  .cart-list {
    display: table;
    border: solid #e9e9e9;
    border-width: 0 1px;

    &.list-move,
    &.list-leave-active {
      transition: all .5s;
    }

    &.list-enter,
    &.list-leave-to {
      height: 0;
      opacity: 0;
    }

    .header {
      display: table-row;

      .text {
        display: table-cell;
        padding: 0 10px;
        height: 40px;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        letter-spacing: .25em;
        color: #fff;
        background: #605f5f;
      }
    }

    .item {
      display: table-row;
      border-bottom: 1px solid #e9e9e9;
      background-color: #fff;

      .text {
        display: table-cell;
        border-bottom: 1px solid #e9e9e9;
        padding: 32px 0;
        text-align: center;
        vertical-align: middle;

        &:first-child {
          display: flex;
          align-items: center;
          text-align: left;
        }

        .pic {
          margin-left: 20px;
          border: 1px solid #e9e9e9;
        }

        .name {
          margin-left: 20px;
          font-size: 14px;
          letter-spacing: 0;
          color: #605f5f;
        }

        .num {
          display: inline-block;
          border: 1px solid #f0f0f0;
          min-width: 50px;
          max-width: 240px;
          height: 30px;
          font-size: 16px;
          text-align: center;
          line-height: 30px;
          color: #605f5f;
        }

        .icon-delete {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url(~"./icon-delete.png");
          cursor: pointer;

          &:hover {
            background: url(~"./icon-delete-active.png");
          }
        }
      }
    }

    .radio-group {
      display: inline-block;
      position: relative;
      margin-left: 20px;
      z-index: 1;
      width: 20px;
      height: 20px;

      &:after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        border: 1px solid #999;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        background-color: #fff;
        cursor: pointer;
        box-sizing: border-box;
        content: '';
      }

      &.active {
        &:after {
          border: 0;
          background-image: url(~"./icon-selected.png");
        }
      }
    }

    @media screen and (max-width: 767px) {
      border: 0;

      .header {
        display: none;
      }

      .item {
        display: block;
        position: relative;
        margin-bottom: 10px;
        border-top: 1px solid #e9e9e9;
        border-bottom: 0;

        .text {
          padding: 8px 0;

          &:first-child {
            padding: 15px 0;
          }

          &:nth-of-type(2) {
            display: none;
          }

          &:nth-of-type(3) {
            padding-left: 8px;
          }

          .radio-group {
            margin-left: 8px;
          }

          .pic {
            margin-left: 8px;
          }

          .name {
            font-weight: 700;
          }

          .icon-delete {
            position: absolute;
            top: 43px;
            right: 10px;
          }

          &.price {
            padding-right: 10px;
            width: 100%;
            text-align: right;
            color: #d1434a;
          }
        }
      }
    }
  }
</style>
