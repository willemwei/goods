<template>
  <div class="preview-order">
    <h3 class="title">订单预览</h3>
    <v-goods-list :check="false" :op="false" :control="false" :cartList="cartList"></v-goods-list>
    <ul class="expense">
      <li class="item">
        <span class="key">商品费用：</span>
        <span class="val">￥{{ goodsExpense.toFixed(2) }}</span>
      </li>
      <li class="item">
        <span class="key">运费：</span>
        <span class="val">￥0.00</span>
      </li>
      <li class="item">
        <span class="key">优惠：</span>
        <span class="val">￥0.00</span>
      </li>
      <li class="item">
        <span class="key">总计：</span>
        <span class="val">￥{{ goodsExpense.toFixed(2) }}</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Axios from 'axios';
  import { mapGetters, mapMutations } from 'vuex';
  import GoodsList from '@/base/goods-list/goods-list';

  export default {
    data () {
      return {
        cartList: []
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
      setTimeout(() => {
        this._getData();
      }, 1000);
    },
    methods: {
      _getData () {
        Axios.post('/apis/users/existAddr', {
          userId: this.user.userId,
          addressId: this.$route.query.addressId
        }).then((res) => {
          res = res.data;
          if (res.status === 1) {
            this.$router.push('/address');
          } else {
            console.log(res.result);
          }
        });

        Axios.post('/apis/goods/getGoods', {
          userId: this.user.userId
        }).then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.cartList = res.result.list.filter((item) => {
              return item.checked;
            });
          }
        });
      },
      ...mapMutations({
        setOrderProcess: 'SET_ORDER_PROCESS'
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
      font-size: 18px;
      text-align: right;

      .key {
        color: #999;
      }

      .val {
        color: #605f5f;
      }
    }
  }
</style>
