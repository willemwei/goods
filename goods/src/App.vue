<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '@/components/header/header';
  import Footer from '@/components/footer/footer';

  export default {
    components: {
      'v-header': Header,
      'v-footer': Footer
    }
  };
</script>

<style lang="less" scoped>
</style>
