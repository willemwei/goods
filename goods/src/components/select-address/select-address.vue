<template>
  <div class="select-address">
    <div class="section">
      <h3 class="title">配送地址</h3>
      <transition-group name="list" tag="ul" class="address-list">
        <li class="item"
            v-for="address in sortAddress"
            :key="address.addressId"
            :class="{'active': addressId === address.addressId}"
            @click="setAddress(address)">
          <b class="name">{{ address.userName }}</b>
          <address class="addr">{{ address.streetName }}</address>
          <p class="tel">{{ address.tel }}</p>
          <div class="op">
            <span class="default" v-if="!address.isDefault" @click="setDefault(address)">设置为默认地址</span>
            <span class="default active" v-else>默认地址</span>
            <i class="icon-delete" @click="deleteAddr(address)">删除</i>
          </div>
        </li>
        <li class="item add-new" key="addAddress">
          <i class="icon-add">添加</i>
          <p class="text">点击添加新地址</p>
        </li>
      </transition-group>
      <div class="more" v-if="!moreAddr && addressList.length > 3">
        <a href="#" @click.prevent="showMore">more<i class="icon-arrow"></i></a>
      </div>
    </div>
    <div class="section">
      <h3 class="title">配送方式</h3>
      <ul class="address-list type">
        <li class="item active">
          <b class="name">标准配送</b>
          <address class="addr">免费</address>
          <p class="op">
            一经发货，商品将于1-7个工作日之内送达。
          </p>
        </li>
      </ul>
    </div>
    <div class="op-wrapper">
      <a href="#" @click.prevent="toPreview" class="btn">预览订单</a>
    </div>
    <v-confirm ref="delete" @leftClick="confirmCancel" @rightClick="confirmDel"></v-confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Axios from 'axios';
  import { mapGetters, mapMutations } from 'vuex';
  import Confirm from '@/base/confirm/confirm';

  export default {
    data () {
      return {
        delAddr: {},
        msg: '',
        moreAddr: false,
        addressId: -1
      };
    },
    computed: {
      sortAddress () {
        let addr = this.addressList.slice();

        for (let i = 0; i < addr.length; i++) {
          if (addr[i].isDefault && i !== 0) {
            addr.splice(0, 0, addr.splice(i, 1)[0]);
            break;
          }
        }

        if (!this.moreAddr) {
          addr = addr.slice(0, 3);
        }

        return addr;
      },
      ...mapGetters([
        'addressList',
        'user'
      ])
    },
    methods: {
      deleteAddr (addr) {
        if (this.addressList.length <= 1 || addr.isDefault) {
          this.msg = this.addressList.length <= 1 ? '地址列表至少有一条数据，已无法继续删除' : '默认地址不能删除';
          this.setAlert({
            show: true,
            msg: this.msg
          });
        } else {
          this.delAddr = addr;
          this.$refs.delete.show();
        }
      },
      confirmCancel () {
        this.$refs.delete.hide();
      },
      confirmDel () {
        if (this.delAddr) {
          Axios.post('/apis/users/delAddress', {
            userId: this.user.userId,
            addressId: this.delAddr.addressId
          }).then((res) => {
            res = res.data;
            this.$refs.delete.hide();

            if (res.status === 0) {
              this.setAddressList(res.result.addressList);
              this.msg = '删除成功!';
            } else {
              this.msg = res.msg;
            }

            this.setAlert({
              show: true,
              msg: this.msg
            });
          });
        }
      },
      setDefault (addr) {
        Axios.post('/apis/users/editAddress', {
          userId: this.user.userId,
          addressId: addr.addressId,
          addrDefault: true
        }).then((res) => {
          res = res.data;

          if (res.status === 0) {
            this.setAddressList(res.result.addressList);
          } else {
            this.setAlert({
              show: true,
              msg: res.msg
            });
          }
        });
      },
      showMore () {
        this.moreAddr = !this.moreAddr;
      },
      setAddress (addr) {
        this.addressId = addr.addressId;
      },
      toPreview () {
        if (this.addressId === -1) {
          this.setAlert({
            msg: '请选择配送地址!',
            show: true
          });
          return false;
        }

        this.$router.push(`/address/preview?addressId=${this.addressId}`);
      },
      ...mapMutations({
        setAddressList: 'SET_ADDRESS_LIST',
        setAlert: 'SET_ALERT',
        setOrderProcess: 'SET_ORDER_PROCESS'
      })
    },
    components: {
      'v-confirm': Confirm
    },
    mounted () {
      this.setOrderProcess(0);
      setTimeout(() => {
        this.addressList.forEach((item) => {
          if (item.isDefault) {
            this.addressId = item.addressId;
          }
        });
      }, 20);
    }
  };
</script>

<style lang="less" scoped>
  @import url('../../common/style/basic.less');

  .select-address {
    .section {
      .title {
        padding: 20px 0;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: .25em;
        color: #605f5f;
      }

      .address-list {
        overflow: hidden;
        transition: all .5s;

        &.type {
          font-size: 16px;

          .addr {
            font-size: 16px;
            font-weight: 700;
          }
        }

        .item {
          float: left;
          margin-right: 20px;
          margin-bottom: 20px;
          padding: 20px;
          border: 2px solid #e9e9e9;
          width: 300px;
          font-size: 14px;
          color: #333;
          background-color: #fff;
          box-sizing: border-box;
          cursor: pointer;

          &:nth-of-type(4n) {
            margin-right: 0;
          }

          &:hover,
          &.active {
            border-color: #ee7a23;
          }

          &.add-new {
            height: 166px;

            .icon-add {
              display: block;
              margin: 20px auto 10px;
              width: 50px;
              height: 50px;
              font-size: 0;
              background-image: url(~"./icon-add-plus.png");
              background-size: cover;
            }

            .text {
              display: block;
              text-align: center;
              color: #605f5f;
            }
          }

          .name {
            display: block;
            padding-bottom: 10px;
            font-size: 16px;
            font-weight: 400;
            line-height: 1em;
            .no-wrap();
          }

          .addr {
            overflow: hidden;
            margin-bottom: 10px;
            height: 3em;
            font-style: normal;
            line-height: 1.5em;
          }

          .tel {
            padding-bottom: 10px;
            line-height: 1em;
          }

          .op {
            overflow: hidden;

            .default {
              float: left;
              line-height: 20px;
              color: #605f5f;
              cursor: pointer;

              &:hover,
              &.active {
                color: #ee7a23;
              }
            }

            .icon-delete {
              display: inline-block;
              float: right;
              width: 20px;
              height: 20px;
              font-size: 0;
              background-image: url(~"./icon-delete.png");
              background-size: cover;
              cursor: pointer;

              &:hover {
                background-image: url(~"./icon-delete-active.png");
              }
            }
          }
        }
      }

      .list-move,
      .list-enter-active,
      .list-leave-active {
        transition: all .5s;
      }

      .list-enter,
      .list-leave-to {
        width: 0;
        opacity: 0;
      }

      .more {
        text-align: center;

        a {
          font-size: 14px;
          color: #ee7a23;
        }

        .icon-arrow {
          display: inline-block;
          margin-left: 5px;
          width: 14px;
          height: 14px;
          vertical-align: middle;
          background-image: url(~"./icon-arrow.png");
          background-size: cover;
        }

        a:hover {
          color: #d1434a;

          .icon-arrow {
            background-image: url(~"./icon-arrow-active.png");
          }
        }
      }
    }

    .op-wrapper {
      overflow: hidden;
      margin: 30px 0;

      .btn {
        .btn();
        float: right;
        margin: 0;
        padding: 0 35px;
        width: auto;
        background-color: #d1434a;
        color: #fff;

        &:hover {
          background-color: #f16f75;
        }
      }
    }

    @media screen and (max-width: 767px) {
      padding: 0 10px;
      box-sizing: border-box;

      .section {
        .title {
          padding: 16px 0;
          font-size: 15px;
          text-align: center;
        }

        .address-list {
          .item {
            margin: 0 auto 10px;
            width: 100%;
          }
        }
      }
    }
  }
</style>
