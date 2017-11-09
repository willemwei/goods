<template>
  <transition name="slide-fade">
    <div class="modal" v-if="modalToggle">
      <div class="bg" @click="hide"></div>
      <div class="wrapper">
        <b class="title">{{ title }}</b>
        <i class="icon-close" @click="hide"></i>
        <slot name="content"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: ''
    },
    data () {
      return {
        modalToggle: false
      };
    },
    methods: {
      show () {
        this.modalToggle = true;
      },
      hide () {
        this.modalToggle = false;
      }
    }
  };
</script>

<style lang="less" scoped>
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9990;
    transition: all .3s;

    &.slide-fade-enter,
    &.slide-fade-leave-to {
      opacity: 0;

      .wrapper {
        top: 60%;
      }
    }

    .bg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9991;
      background-color: rgba(0, 0, 0, .5);
    }

    .wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 9999;
      border-radius: 10px;
      padding: 20px 50px 40px;
      width: 500px;
      max-width: 90%;
      min-height: 270px;
      background-color: #fff;
      transform: translate3d(-50%, -50%, 0);
      box-shadow: 0 0 5px rgba(0, 0, 0, .3);
      box-sizing: border-box;
      transition: all .3s ease-out;

      @media screen and (max-width: 767px) {
        padding: 20px;
        min-height: auto;
      }

      .title {
        display: block;
        min-height: 1em;
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }

      .icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 17px;
        height: 17px;
        cursor: pointer;
        background-image: url(~"./icon-close.png");
        background-size: cover;
        transition: all .3s;
      }

      .icon-close:hover {
        transform: rotate(180deg);
      }
    }
  }
</style>
