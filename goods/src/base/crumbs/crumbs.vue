<template>
  <nav class="crumbs">
    <div class="w1260">
      <a class="link" href="#" @click.prevent="$router.push('/')">首页</a>
      <span class="divise">/</span>
      <span class="current">
        <slot></slot>
      </span>
    </div>
  </nav>
</template>

<style lang="less" scoped>
  @import url('../../common/style/basic.less');

  .crumbs {
    padding: 10px 0;
    height: 25px;
    font-size: 0;
    line-height: 25px;
    color: #999;
    background-color: #f0f0f0;

    .link {
      font-size: 14px;
      color: #999;

      &:hover {
        color: #d1434a;
      }
    }

    .divise {
      margin: 0 8px;
      font-size: 14px;
    }

    .current {
      font-size: 14px;
      color: #d1434a;
    }
  }
</style>
