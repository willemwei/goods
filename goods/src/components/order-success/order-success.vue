<template>
  <div class="order-success w1260">
    <i class="icon-success"></i>
    <p class="text">下单成功!</p>
    <p class="orderInfo">
      <span>订单号：{{ $route.query.orderId }}</span>
      <span>订单费用：￥{{ formatM($route.query.orderTotal * 1) }}</span>
    </p>
    <div class="btns">
      <a href="#" @click.prevent="$router.push('/cart')" class="btn btn-cart">购物车列表</a>
      <a href="#" @click.prevent="$router.push('/')" class="btn btn-goods">商品列表</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex';
  import { formatMoney } from '@/common/js/format';

  export default {
    methods: {
      formatM (num) {
        return formatMoney(num);
      },
      ...mapMutations({
        setOrderProcess: 'SET_ORDER_PROCESS'
      })
    },
    mounted () {
      this.setOrderProcess(3);
    }
  };
</script>

<style lang="less" scoped>
  @import url('../../common/style/basic.less');

  .order-success {
    .icon-success {
      display: block;
      margin: 80px auto 60px;
      width: 100px;
      height: 100px;
      background-image: url("./icon-success.png");
      background-size: cover;
    }

    .text {
      margin-bottom: 20px;
      font-size: 22px;
      text-align: center;
      letter-spacing: 1px;
      color: #333;
    }

    .orderInfo {
      margin-bottom: 40px;
      text-align: center;
      font-size: 0;
      color: #999;

      span {
        margin: 0 10px;
        font-size: 18px;
      }
    }

    .btns {
      margin-bottom: 50px;
      font-size: 0;
      text-align: center;

      .btn {
        .btn();
        margin: 0 10px;
        padding: 0 35px;
        width: auto;
        font-size: 14px;

        &.btn-goods {
          color: #fff;
          background-color: #d1434a;

          &:hover {
            background-color: #f16f75;
          }
        }

        &.btn-cart {
          &:hover {
            background-color: #ffe5e6;
          }
        }
      }
    }

    @media screen and (max-width: 767px) {
      .orderInfo {
        span {
          display: block;
          margin: 10px 0;
        }
      }
    }
  }
</style>
