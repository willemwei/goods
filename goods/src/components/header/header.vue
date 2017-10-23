<template>
  <header class="header">
    <div class="w1260">
      <a class="logo" href="/">
        <h1 class="hide-title">简易商城</h1>
        <img src="./logo.png" alt="简易商城" title="简易商城">
      </a>
      <div class="log-container">
        <span>登录</span>
        <span>退出</span>
        <span class="shopcar">购物车</span>
      </div>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
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
  }
</style>
