<template>
  <div class="address">
    <v-crumbs>选择地址</v-crumbs>
    <ul class="process w1260">
      <li class="item" :class="{active: orderProcess >= 0}">选择地址</li>
      <li class="item" :class="{active: orderProcess >= 1}">预览订单</li>
      <li class="item" :class="{active: orderProcess >= 2}">支付费用</li>
      <li class="item" :class="{active: orderProcess >= 3}">下单成功</li>
    </ul>
    <router-view class="w1260"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import Crumbs from '@/base/crumbs/crumbs';

  export default {
    components: {
      'v-crumbs': Crumbs
    },
    computed: {
      ...mapGetters([
        'user',
        'orderProcess'
      ])
    },
    mounted() {
      if (!this.user) {
        this.$router.push('/');
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url('../../common/style/basic.less');

  .address {
    .process {
      display: flex;
      margin-top: 30px;
      margin-bottom: 20px;

      .item {
        position: relative;
        flex: 1;
        border-bottom: 2px solid #ccc;
        padding: 0 16px 20px;
        font-weight: 700;
        text-align: center;
        line-height: 1.25em;
        color: #999;

        &:after {
          position: absolute;
          bottom: 0;
          left: 50%;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          background-color: #ccc;
          transform: translate(-50%, 50%);
          content: '';
        }

        &.active {
          border-color: #d1434a;
          color: #d1434a;

          &:after {
            background-color: #d1434a;
          }
        }
      }
    }
  }
</style>
