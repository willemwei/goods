<template>
  <div class="cart">
    <v-crumbs>我的购物车</v-crumbs>
    <h2 class="title w1260">我的购物车</h2>
    <v-goods-list :cartList="cartList" @setChecked="setChecked" @countEdit="countEdit"
                  @deleteItem="deleteItem"></v-goods-list>
    <div class="total w1260">
      <div class="all-selected" @click="allChecked">
        <span class="radio-group" :class="{'active': totalChecked}"></span>
        <span class="text">全选</span>
      </div>
      <div class="price-total">
        <span class="text">总价：</span>
        <span class="price">￥{{ formatM(totalPrice) }}</span>
        <div class="btn" :class="{'active': totalPrice}" @click="placeOrder">提交订单</div>
      </div>
    </div>
    <v-confirm ref="delete" @leftClick="deleteCancel" @rightClick="deleteOk"></v-confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Crumbs from '@/base/crumbs/crumbs';
  import Confirm from '@/base/confirm/confirm';
  import GoodsList from '@/base/goods-list/goods-list';
  import Axios from 'axios';
  import Vue from 'vue';
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { formatMoney } from '@/common/js/format';

  export default {
    components: {
      'v-crumbs': Crumbs,
      'v-confirm': Confirm,
      'v-goods-list': GoodsList
    },
    data () {
      return {
        delGoods: {}
      };
    },
    computed: {
      totalPrice () {
        let result = 0;
        this.cartList.forEach((item) => {
          if (item.productNum && item.salePrice && item.checked) {
            result += item.productNum * item.salePrice;
          }
        });

        return result;
      },
      totalChecked () {
        let result = this.cartList.length !== 0;

        this.cartList.forEach((item) => {
          if (!item.checked) {
            result = false;
          }
        });

        return result;
      },
      ...mapGetters([
        'user',
        'cartList'
      ])
    },
    methods: {
      deleteItem (item) {
        this.delGoods = item;
        this.$refs.delete.show();
      },
      deleteOk () {
        this.$refs.delete.hide();

        if (this.deleteItem) {
          Axios.post('/apis/goods/delCart', {
            'userId': this.user.userId,
            'productId': this.delGoods.productId
          }).then((res) => {
            let msg = res.msg;
            res = res.data;

            if (res.status === 0) {
              msg = '删除成功';
              this.cartList.forEach((item, index) => {
                if (item.productId === this.delGoods.productId) {
                  this.spliceCartList({index});
                }
              });
            }

            this.setAlert({
              show: true,
              msg
            });
          });
        }
      },
      deleteCancel () {
        this.delGoods = {};
        this.$refs.delete.hide();
      },
      setChecked (item) {
        Axios.post('apis/goods/setCart', {
          userId: this.user.userId,
          productId: item.productId,
          params: {
            checked: item.checked ? 0 : 1
          }
        }).then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.setCartList(res.result.list);
          }
        });
      },
      allChecked () {
        if (this.cartList.length === 0) {
          return;
        }

        Axios.post('/apis/goods/setCart', {
          userId: this.user.userId,
          allChecked: !this.totalChecked
        }).then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.setCartList(res.result.list);
          }
        });
      },
      countEdit (item) {
        Axios.post('apis/goods/setCart', {
          userId: this.user.userId,
          productId: item.productId,
          params: {
            productNum: item.productNum
          }
        }).then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.setCartList(res.result.list);
          }
        });
      },
      placeOrder () {
        if (this.totalPrice) {
          this.$router.push('/address');
          this.setOrderProcess(0);
        }
      },
      formatM(num) {
        return formatMoney(num);
      },
      _getGoods () {
        setTimeout(() => {
          Axios.post('/apis/goods/getGoods', {
            userId: this.user.userId
          }).then((res) => {
            if (res.data.status === 0) {
              this.setCartList(res.data.result.list);
            }
          });
        }, 0);
      },
      ...mapMutations({
        'setCartList': 'SET_CART_LIST',
        'setAlert': 'SET_ALERT',
        'setOrderProcess': 'SET_ORDER_PROCESS'
      }),
      ...mapActions([
        'spliceCartList'
      ])
    },
    created () {
      if (!this.user) {
        this.$router.push('/');
      }
      this._getGoods();
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
          user-select: none;
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
          cursor: not-allowed;
          user-select: none;

          &.active {
            cursor: pointer;
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
