<template>
  <footer class="footer w1260">
    <span>© 版权所有 重庆xxx有限公司</span>
    <span>许可证编号：渝ICP备12345号</span>
    <span>技术支持：weish</span>
  </footer>
</template>

<style lang="less" scoped>
  @import url('../../common/style/basic.less');

  .footer {
    border-top: 1px solid rgba(51,51,51,.15);
    height: 80px;
    font-size: 0;
    text-align: center;
    line-height: 80px;

    & > span {
      display: inline-block;
      margin: 0 10px;
      font-size: 14px;
      color: #ada9a5;
    }

    @media screen and (max-width: 767px) {
      padding: 10px 0;
      height: auto;
      line-height: 25px;
    }
  }
</style>
