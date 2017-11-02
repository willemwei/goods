<template>
  <header class="header">
    <div class="w1260">
      <a class="logo" href="/">
        <h1 class="hide-title">简易商城</h1>
        <img src="./logo.png" alt="简易商城" title="简易商城">
      </a>
      <div class="log-container">
        <span v-if="!user.userId" @click="logShow">登录</span>
        <span v-if="user.userId">{{ user.userName }}</span>
        <span v-if="user.userId" @click="exit">退出</span>
        <span v-if="user.userId" class="shopcar" @click="goShopcar">购物车</span>
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
        'user'
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
          if (res.data.status === 0) {
            this.setUser(res.data.result);
            this.$refs.login.hide();
            this.errInfo = '';
          } else {
            this.errInfo = res.data.msg;
          }
        });
      },
      _checkLog () {
        Axios.post('/apis/users/checkLog').then((res) => {
          res = res.data;
          if (res.status === 0) {
            this.setUser(res.result);
          }

          if (res.status === 2) {
            this.$router.push('/');
          }
        });
      },
      ...mapMutations({
        setUser: 'SET_USER'
      })
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
        margin-right: 0;
        width: 24px;
        height: 24px;
        font-size: 0;
        background-image: url(~'./icon-shopcar.png');
        -webkit-background-size: cover;
        background-size: cover;
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
  }
</style>
