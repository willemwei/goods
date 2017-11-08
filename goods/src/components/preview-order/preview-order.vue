<template>
  <div class="preview-order">
    <h3 class="title">订单预览</h3>
    <v-goods-list :check="false" :op="false" :control="false" :cartList="cartList"></v-goods-list>
    <ul class="expense">
      <li class="item">
        <span class="key">商品费用：</span>
        <span class="val">￥{{ formatM(goodsExpense) }}</span>
      </li>
      <li class="item">
        <span class="key">运费：</span>
        <span class="val">￥0.00</span>
      </li>
      <li class="item">
        <span class="key">优惠：</span>
        <span class="val">￥0.00</span>
      </li>
      <li class="item total">
        <span class="key">总计：</span>
        <span class="val">￥{{ formatM(goodsExpense) }}</span>
      </li>
    </ul>
    <div class="btns">
      <a href="#" @click.prevent="$router.push('/address')" class="btn btn-prev">选择地址</a>
      <a href="#" @click.prevent="toNext" class="btn btn-next">支付费用</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Axios from 'axios';
  import { mapGetters, mapMutations } from 'vuex';
  import GoodsList from '@/base/goods-list/goods-list';
  import { formatMoney } from '@/common/js/format';

  export default {
    data () {
      return {
        cartList: [],
        addressInfo: {}
      };
    },
    components: {
      'v-goods-list': GoodsList
    },
    computed: {
      goodsExpense () {
        let total = 0;
        this.cartList.forEach((item) => {
          total += item.productNum * item.salePrice;
        });

        return total;
      },
      ...mapGetters([
        'user'
      ])
    },
    created () {
      this._getData();
    },
    methods: {
      toNext () {
        Axios.post('/apis/users/addOrder', {
          userId: this.user.userId,
          params: {
            orderTotal: this.goodsExpense,
            addressInfo: this.addressInfo,
            goodsList: this.cartList
          }
        }).then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.$router.push({
              path: '/address/success',
              query: {
                orderId: res.result.orderId,
                orderTotal: this.goodsExpense
              }
            });
          } else {
            this.setAlert({
              msg: '提交订单失败',
              show: true
            });
          }
        });
      },
      formatM (num) {
        return formatMoney(num);
      },
      _getData () {
        this.setOrderProcess(1);

        Axios.post('/apis/users/existAddr', {
          userId: this.user.userId,
          addressId: this.$route.query.addressId
        }).then((res) => {
          res = res.data;
          if (res.status === 1) {
            this.$router.push('/address');
          } else {
            this.addressInfo = res.result.addressInfo;
            this.cartList = res.result.cartList.filter((item) => {
              return item.checked;
            });
          }
        });
      },
      ...mapMutations({
        setOrderProcess: 'SET_ORDER_PROCESS',
        setAlert: 'SET_ALERT'
      })
    }
  };
</script>

<style lang="less" scoped>
  @import url('../../common/style/basic.less');

  .preview-order {
    .title {
      padding: 20px 0;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: .25em;
      color: #605f5f;
    }

    .expense {
      display: table;
      margin-top: 60px;
      width: 100%;
      text-align: right;

      .item {
        display: table-row;
        width: 100%;
        height: 36px;
        font-size: 0;

        &.total {
          .val {
            font-weight: 700;
            color: #d1434a;
          }
        }

        .key {
          display: table-cell;
          font-size: 18px;
          color: #999;
        }

        .val {
          display: table-cell;
          padding-right: 10px;
          padding-left: 10px;
          width: 20px;
          font-size: 18px;
          color: #605f5f;
        }
      }
    }

    .btns {
      overflow: hidden;
      margin: 20px 0 30px;

      .btn {
        .btn();
        margin: 0;
        padding: 0 35px;
        width: auto;

        &.btn-prev {
          float: left;

          &:hover {
            background-color: #ffe5e6;
          }
        }

        &.btn-next {
          float: right;
          color: #fff;
          background-color: #d1434a;

          &:hover {
            background-color: #f16f75;
          }
        }
      }
    }

    @media screen and (max-width: 767px) {
      .title {
        padding: 16px 0;
        font-size: 15px;
        text-align: center;
      }

      .expense {
        margin-top: 20px;

        .item {
          height: 20px;

          .key {
            font-size: 13px;
          }

          .val {
            font-size: 13px;
          }
        }
      }

      .btns {
        margin: 20px 0;
        padding: 0 10px;
      }
    }
  }
</style>
