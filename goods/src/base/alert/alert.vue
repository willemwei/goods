<template>
  <div class="alert-wrapper">
    <div class="bg"></div>
    <div class="alert">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="less" scoped>
  .alert-wrapper {
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
    }
  }
</style>
