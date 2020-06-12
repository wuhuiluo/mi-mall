<template>
  <div class="nav-bar" :class="{ 'is-fixed': isFixed }">
    <div class="container w">
      <div class="pro-title">
        {{ title }}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span> <a href="javascript:;">参数</a><span>|</span> <a href="javascript:;">用户评价</a><span>|</span>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isFixed: false
    }
  },
  mounted() {
    // 绑定监听滚动事件
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > 152 ? true : false
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false)
  }
}
</script>
<style lang='less' scoped>
@import '~assets/css/mixin.less';
.nav-bar {
  height: 63px;
  line-height: 63px;
  border-top: 1px solid #e5e5ee;
  background-color: #fff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2px;
  &.is-fixed {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .container {
    .flex();
    .pro-title {
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }
    .pro-param {
      font-size: 14px;
      color: #666;
      span {
        margin: 0 10px;
      }
    }
  }
}
</style>