<template>
  <div class="goods">
    <v-brumbs>Goods</v-brumbs>
    <div class="w1260">
      <div class="sort-wrapper">
        <span>排序方式：</span>
        <a href="javascript: void(0)">默认排序</a>
        <a href="javascript: void(0)">价格<i class="icon-price"></i></a>
      </div>
      <div class="goods-wrapper">
        <dl class="price-list">
          <dt class="title">价格区间：</dt>
          <dd class="item active">ALL</dd>
          <dd class="item">0.00 - 100.00</dd>
        </dl>
        <ul class="goods-list">
          <li class="item"></li>
          <li class="item"></li>
          <li class="item"></li>
          <li class="item"></li>
          <li class="item"></li>
          <li class="item"></li>
          <li class="item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Brumbs from '@/base/crumbs/crumbs';
  import axios from 'axios';

  export default {
    mounted () {
      this._getCodeList();
    },
    components: {
      'v-brumbs': Brumbs
    },
    methods: {
      _getCodeList () {
        axios.get('/api/goods').then((res) => {
          console.log(res.data);
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url('../../common/style/basic.less');

  .goods {
    .w1260 {
      padding-top: 60px;

      .sort-wrapper {
        padding-right: 50px;
        height: 55px;
        font-size: 0;
        text-align: right;
        line-height: 55px;
        background-color: #fff;

        & > span {
          font-size: 14px;
          color: #605f5f;
        }

        & > a {
          margin-right: 15px;
          font-size: 14px;
          color: #605f5f;

          &.active,
          &:hover {
            color: #ee7a23;

            .icon-price {
              background-image: url(~"./icon-arrow-top-active.png");
            }
          }

          &.desc-bottom {
            .icon-price {
              -webkit-transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              transform: rotate(180deg);
            }
          }

          &:last-child {
            margin-right: 0;
          }

          .icon-price {
            display: inline-block;
            margin-left: 3px;
            width: 11px;
            height: 11px;
            background-image: url(~"./icon-arrow-top.png");
            background-size: cover;
          }
        }
      }

      .goods-wrapper {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding-top: 30px;

        .price-list {
          flex: 1;
          padding: 0 20px;
          font-size: 14px;
          color: #605f5f;

          .title {
            margin-bottom: 30px;
            font-weight: 700;
          }

          .item {
            margin: 20px 0;
            padding: 5px 0;
            cursor: pointer;
            -webkit-transition: padding .3s, color .3s;
            -moz-transition: padding .3s, color .3s;
            -ms-transition: padding .3s, color .3s;
            -o-transition: padding .3s, color .3s;
            transition: padding .3s, color .3s;

            &.active,
            &:hover {
              border-left: 2px solid rgb(238, 122, 35);
              padding-left: 15px;
              color: rgb(238, 122, 35);
            }
          }
        }

        .goods-list {
          padding: 0;
          flex: 0 0 985px;
          width: 985px;
          font-size: 0;

          .item {
            display: inline-block;
            margin-bottom: 15px;
            margin-left: 15px;
            border: 2px solid #e9e9e9;
            width: 235px;
            height: 400px;
            font-size: 16px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            &:nth-of-type(4n + 1) {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
</style>
