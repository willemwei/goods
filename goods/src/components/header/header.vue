<template>
  <header class="header">
    <div class="w1260">
      <a class="logo" href="#" @click.prevent="$router.push('/')">
        <h1 class="hide-title">简易商城</h1>
        <img src="./logo.png" alt="简易商城" title="简易商城">
      </a>
      <div class="log-container">
        <span v-if="!user.userId" @click="logShow">登录</span>
        <span v-if="user.userId">{{ user.userName }}</span>
        <span v-if="user.userId" @click="exit">退出</span>
        <span v-if="user.userId" class="shopcar" @click="goShopcar">购物车<i class="num">{{ cartList.length }}</i></span>
      </div>
    </div>
    <v-modal class="login" ref="login" title="登录">
      <div slot="content">
        <div class="input-group">
          <i class="icon icon-person"></i>
          <input class="input-box" v-model:value="userName" type="text" placeholder="用户名">
        </div>
        <div class="input-group">
          <i class="icon icon-lock"></i>
          <input class="input-box" v-model:value="userPwd" type="password" placeholder="密码">
        </div>
        <div class="btn-group">
          <a class="btn" href="#" @click.prevent="login">登录</a>
        </div>
        <div class="err" v-show="errInfo">{{ errInfo }}</div>
      </div>
    </v-modal>
    <v-modal class="alert" ref="alert">
      <p class="desc" slot="content">{{ alert.msg }}</p>
      <div class="btns" slot="footer">
        <a class="btn" href="#" @click.prevent="hideAlert">关闭</a>
      </div>
    </v-modal>
  </header>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/base/modal/modal';
  import Axios from 'axios';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    data () {
      return {
        logToggle: false,
        userName: 'admin',
        userPwd: '123456',
        logUser: {},
        errInfo: ''
      };
    },
    components: {
      'v-modal': Modal
    },
    mounted () {
      this._checkLog();
    },
    computed: {
      ...mapGetters([
        'user',
        'cartList',
        'alert'
      ])
    },
    methods: {
      logShow () {
        this.$refs.login.show();
      },
      goShopcar () {
        this.$router.push('/cart');
      },
      exit () {
        Axios.post('apis/users/logOut').then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.setUser({});
            this.setAddressList([]);
            this.setCartList([]);
            this.$router.push('/');
          }
        });
      },
      login () {
        if (!this.userName || !this.userPwd) {
          this.errInfo = '输入不能为空';
          return;
        }

        Axios.post('/apis/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.setUser({
              userId: res.result.userId,
              userName: res.result.userName
            });
            this.setCartList(res.result.cartList);
            this.setAddressList(res.result.addressList);
            this.$refs.login.hide();
            this.errInfo = '';
          } else {
            this.errInfo = res.data.msg;
          }
        });
      },
      hideAlert () {
        this.setAlert({
          show: false,
          msg: ''
        });
      },
      _checkLog () {
        Axios.post('/apis/users/checkLog').then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.setUser({
              userId: res.result.userId,
              userName: res.result.userName
            });
            this.setCartList(res.result.cartList);
            this.setAddressList(res.result.addressList);
          }

          if (res.status === 2) {
            this.$router.push('/');
          }
        });
      },
      ...mapMutations({
        setUser: 'SET_USER',
        setCartList: 'SET_CART_LIST',
        setAddressList: 'SET_ADDRESS_LIST',
        setAlert: 'SET_ALERT'
      })
    },
    watch: {
      alert (newVal) {
        if (newVal.show) {
          this.$refs.alert.show();
        } else {
          this.$refs.alert.hide();
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../common/style/basic.less");

  .header {
    overflow: hidden;
    background-color: #fff;

    .logo {
      display: inline-block;
      float: left;

      .hide-title {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        font-size: 0;
      }

      img {
        display: block;
        padding: 10px 15px;
        width: auto;
        max-height: 50px;
      }
    }

    .log-container {
      float: right;
      padding: 22px 0;
      font-size: 0;
      color: #666;

      & > span {
        display: inline-block;
        margin-right: 20px;
        font-size: 16px;
        vertical-align: middle;

        &:hover {
          color: #d1434a;
          cursor: pointer;
        }
      }

      .shopcar {
        position: relative;
        margin-right: 0;
        width: 24px;
        height: 24px;
        font-size: 0;
        background-image: url(~'./icon-shopcar.png');
        -webkit-background-size: cover;
        background-size: cover;

        .num {
          position: absolute;
          top: -9px;
          right: -11px;
          border-radius: 10px;
          padding: 1px 2px;
          min-width: 11px;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          text-align: center;
          color: #fff;
          background-color: #eb767d;
        }
      }
    }

    .login {
      .input-group {
        display: flex;
        margin-top: 25px;
        border: 1px solid #ccc;
        font-size: 0;
        align-items: center;

        .icon {
          display: inline-block;
          margin: 0 8px 0 14px;
          width: 22px;
          height: 22px;
          background-size: 100%;

          &.icon-person {
            background-image: url(~"./icon-person.png");
          }

          &.icon-lock {
            background-image: url(~"./icon-lock.png");
          }
        }

        .input-box {
          display: inline-block;
          flex: 1;
          border: 0;
          padding: 9px 0 10px;
          font-size: 14px;
          color: #333;
          outline: 0;
        }
      }

      .btn-group {
        margin-top: 25px;

        .btn {
          display: block;
          border: 2px solid #009de6;
          height: 38px;
          font-size: 18px;
          text-align: center;
          line-height: 38px;
          color: #fff;
          background: #009de6;

          &:hover {
            border: 2px solid #61b1ef;
            background: #61b1ef;
          }
        }
      }

      .err {
        margin-top: 10px;
        font-size: 13px;
        text-align: center;
        color: #f00;
      }
    }

    .alert {
      .desc {
        margin: 30px 0 80px;
        font-size: 14px;
        text-align: center;
        color: #605f5f;
      }

      .btns {
        text-align: center;

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

          &:hover {
            background-color: #ffe5e6;
          }
        }
      }
    }
  }
</style>
