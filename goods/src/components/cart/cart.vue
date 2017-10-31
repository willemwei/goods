<template>
  <div class="cart">
    <v-crumbs>我的购物车</v-crumbs>
    <h2 class="title w1260">我的购物车</h2>
    <ul class="cart-list w1260">
      <li class="header">
        <div class="text">商品名</div>
        <div class="text">价格</div>
        <div class="text">数量</div>
        <div class="text">单价</div>
        <div class="text">操作项</div>
      </li>
      <li class="item" v-for="item in goods">
        <div class="text">
          <span class="radio-group" :class="{'active': item.checked}"></span>
          <img class="pic" :src="'/static/images/' + item.productImage" width="78" height="78">
          <span class="name">{{ item.productName }}</span>
        </div>
        <div class="text">￥{{ (item.salePrice*1).toFixed(2) }}</div>
        <div class="text">
          <v-cart-control :goods="item"></v-cart-control>
        </div>
        <div class="text price">￥295.00</div>
        <div class="text">
          <i class="icon-delete" @click="deleteItem"></i>
        </div>
      </li>
    </ul>
    <div class="total w1260">
      <div class="all-selected">
        <span class="radio-group"></span>
        <span class="text">全选</span>
      </div>
      <div class="price-total">
        <span class="text">总价：</span>
        <span class="price">￥0.00</span>
        <div class="btn">提交订单</div>
      </div>
    </div>
    <v-modal ref="delete" class="delete">
      <div class="desc" slot="content">
        <i class="icon-check"></i>
        <span class="text">确定要删除吗？</span>
      </div>
      <div class="btns" slot="footer">
        <a class="btn btn-goon" href="#" @click.prevent="deleteOk">确认</a>
        <a class="btn btn-shopcar" href="#" @click.prevent="deleteCancel">取消</a>
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Crumbs from '@/base/crumbs/crumbs';
  import CartControl from '@/base/cart-control/cart-control';
  import Modal from '@/base/modal/modal';
  import Axios from 'axios';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      'v-crumbs': Crumbs,
      'v-cart-control': CartControl,
      'v-modal': Modal
    },
    data () {
      return {
        goods: []
      };
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    methods: {
      deleteItem () {
        this.$refs.delete.show();
      },
      deleteOk () {},
      deleteCancel () {
        this.$refs.delete.hide();
      }
    },
    created () {
      Axios.post('/apis/goods/getGoods', {
        userId: this.userId
      }).then((res) => {
        if (res.data.status === 0) {
          this.goods = res.data.result.list;
        }
      });
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../common/style/basic.less");

  .cart {
    .title {
      padding: 40px 0 20px;
      font-size: 22px;
      letter-spacing: .25em;
      color: #333;
    }

    .cart-list {
      display: table;
      border: solid #e9e9e9;
      border-width: 0 1px;

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
          padding: 32px 0;
          text-align: center;

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

    .total {
      position: relative;
      margin-top: 20px;
      margin-bottom: 100px;
      border: 1px solid #e9e9e9;
      height: 54px;
      background-color: #fff;

      & > div {
        display: inline-block;
      }

      .all-selected {
        position: relative;
        top: 17px;
        font-size: 0;
        float: left;

        &:hover {
          .text {
            color: #d1434a;
          }
        }

        .radio-group {
          position: relative;
          top: -1px;
        }

        .text {
          margin-left: 20px;
          font-size: 16px;
          vertical-align: top;
          color: #605f5f;
          cursor: pointer;
        }
      }

      .price-total {
        float: right;
        font-size: 0;

        .text {
          display: inline-block;
          font-size: 16px;
          letter-spacing: .25em;
          color: #999;
        }

        .price {
          display: inline-block;
          margin-right: 30px;
          font-size: 18px;
          font-weight: 700;
          vertical-align: sub;
          color: #d1434a;
        }

        .btn {
          display: inline-block;
          padding: 0 20px;
          height: 55px;
          text-align: center;
          line-height: 55px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .25em;
          color: #fff;
          background-color: #ccc;

          &.active {
            background-color: #de414a;

            &:hover {
              background-color: #f16f75;
            }
          }
        }
      }
    }

    .delete {
      .desc {
        margin: 30px 0 80px;
        font-size: 14px;
        text-align: center;
        color: #605f5f;
      }

      .btns {
        font-size: 0;

        .btn {
          display: inline-block;
          margin: 0 2.5%;
          border: 1px solid #d1434a;
          width: 45%;
          min-width: 80px;
          height: 40px;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          line-height: 40px;
          letter-spacing: .25em;
          color: #d1434a;
          box-sizing: border-box;

          &.btn-goon:hover {
            background-color: #ffe5e6;
          }

          &.btn-shopcar {
            border-color: #d1434a;
            color: #fff;
            background-color: #d1434a;

            &:hover {
              background-color: #f16f75;
              border-color: #f16f75;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
