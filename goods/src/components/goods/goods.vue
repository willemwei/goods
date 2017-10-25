<template>
  <div class="goods">
    <v-brumbs>Goods</v-brumbs>
    <div class="w1260">
      <div class="sort-wrapper">
        <span>排序方式：</span>
        <a href="#" @click.prevent="sortCh(0)" :class="{'active': sortType === 0}">默认排序</a>
        <a href="#" @click.prevent="sortCh(sortType===0?-1:sortType)"
           :class="{'active': sortType !== 0, 'desc-bottom': sortType === 2}">
          价格<i class="icon-price"></i></a>
      </div>
      <div class="goods-wrapper">
        <dl class="price-list">
          <dt class="title">价格区间：</dt>
          <dd class="item" :class="{'active': priceSelect === -1}" @click="priceRing(-1)">ALL</dd>
          <dd class="item" v-for="(item, index) in priceFilter" @click="priceRing(index)"
              :class="{'active': index === priceSelect}">
            {{ item.start.toFixed(2) }} - {{ item.end.toFixed(2) }}
          </dd>
        </dl>
        <ul class="goods-list">
          <li class="item" v-for="(item, index) in goodsSort" :key="index">
            <a href="#" @click.prevent="">
              <img width="231" height="231" border="0" v-lazy="item.productImg">
            </a>
            <b class="name">{{ item.productName }}</b>
            <span class="price">￥ {{ (item.productPrice * 1).toFixed(2) }}</span>
            <a class="add-car" href="#" @click.prevent="">加入购物车</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Brumbs from '@/base/crumbs/crumbs';
  import axios from 'axios';

  const SORT_DEFAULT = 0;
  const SORT_PRICE_UP = 1;
  const SORT_PRICE_DOWN = 2;
  const SELECT_ALL = -1;

  export default {
    data () {
      return {
        goods: [],
        priceFilter: [
          {
            start: 0,
            end: 1000
          },
          {
            start: 1000,
            end: 2000
          },
          {
            start: 2000,
            end: 3000
          }
        ],
        priceSelect: SELECT_ALL,
        sortType: SORT_DEFAULT
      };
    },
    created () {
      this._getCodeList();
    },
    components: {
      'v-brumbs': Brumbs
    },
    methods: {
      sortCh (sort) {
        this.sortType = sort;

        if (this.sortType === -1) {
          this.sortType = SORT_PRICE_UP;
        } else if (this.sortType !== SORT_DEFAULT) {
          this.sortType = this.sortType === SORT_PRICE_UP ? SORT_PRICE_DOWN : SORT_PRICE_UP;
        }
      },
      priceRing (index) {
        this.priceSelect = index;
      },
      _getCodeList () {
        axios.get('/api/goods').then((res) => {
          if (res.data.status * 1 === 0) {
            this.goods = res.data.result;
          }
        });
      }
    },
    computed: {
      goodsSort () {
        let goodsCopy = this.goods.slice();

        if (this.sortType !== SORT_DEFAULT) {
          goodsCopy.sort((a, b) => {
            if (a.productPrice > b.productPrice) {
              return true;
            }
          });

          if (this.sortType === SORT_PRICE_DOWN) {
            goodsCopy.reverse();
          }
        }

        if (this.priceSelect !== SELECT_ALL) {
          let price = this.priceFilter[this.priceSelect];
          goodsCopy = goodsCopy.filter((item) => {
            if (item.productPrice < price.end && item.productPrice >= price.start) {
              return true;
            }
          });
        }

        return goodsCopy;
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
        display: flex;
        padding-top: 30px;

        .price-list {
          flex: 0 0 230px;
          padding: 0 20px;
          width: 230px;
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
            transition: padding .5s ease-out,
            color .5s ease-out;

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
          flex: 1;
          font-size: 0;

          .item {
            display: inline-block;
            margin-bottom: 15px;
            margin-left: 15px;
            border: 2px solid #e9e9e9;
            width: 235px;
            height: 400px;
            font-size: 16px;
            background-color: #fff;
            box-sizing: border-box;
            transition: all .5s ease-out;

            &:nth-of-type(4n + 1) {
              margin-left: 0;
            }

            &:hover {
              border-color: #ee7a23;
              transform: translateY(-5px);
              box-shadow: 0 0 10px #999;
            }

            .name {
              display: block;
              overflow: hidden;
              margin: 20px 10px 0;
              height: 4em;
              font-size: 14px;
              color: #605f5f;
            }

            .price {
              display: block;
              margin: 0 10px;
              font-size: 17px;
              color: #d1434a;
            }

            .add-car {
              display: block;
              border: 1px solid #d1434a;
              margin: 15px 10px 0;
              height: 40px;
              font-weight: 700;
              text-align: center;
              line-height: 40px;
              color: #d1434a;
              transition: all .5s ease-out;

              &:hover {
                background-color: #ffe5e6;
              }
            }
          }
        }
      }
    }
  }
</style>
