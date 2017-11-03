<template>
  <div class="confirm-wrapper">
    <v-modal class="confirm" ref="confirm">
      <div class="desc" slot="content">
        <i class="icon-check"></i>
        <span class="text">{{ msg }}</span>
      </div>
      <div class="btns" slot="footer">
        <a class="btn btn-goon" href="#" @click.prevent="leftClick">{{ btns.leftText }}</a>
        <a class="btn btn-shopcar" href="#" @click.prevent="rightClick">{{ btns.rightText }}</a>
      </div>
    </v-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '@/base/modal/modal';

  export default {
    props: {
      msg: {
        type: String,
        default: '确认要删除吗?'
      },
      btns: {
        type: Object,
        default: () => {
          return {
            leftText: '取消',
            rightText: '删除'
          };
        }
      }
    },
    methods: {
      hide () {
        this.$refs.confirm.hide();
      },
      show () {
        this.$refs.confirm.show();
      },
      leftClick () {
        this.$emit('leftClick');
      },
      rightClick () {
        this.$emit('rightClick');
      }
    },
    components: {
      'v-modal': Modal
    }
  };
</script>

<style lang="less" scoped>
  .confirm-wrapper {
    .confirm {
      .desc {
        margin: 30px 0 80px;
        font-size: 14px;
        text-align: center;
        color: #605f5f;
      }

      .btns {
        font-size: 0;

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
          box-sizing: border-box;

          &.btn-goon:hover {
            background-color: #ffe5e6;
          }

          &.btn-shopcar {
            border-color: #d1434a;
            color: #fff;
            background-color: #d1434a;

            &:hover {
              background-color: #f16f75;
              border-color: #f16f75;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
