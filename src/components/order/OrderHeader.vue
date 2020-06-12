<template>
  <div class="order-header w clearfix">
    <div class="header-logo fl">
      <a href="/#/index"></a>
    </div>
    <div class="title fl">
      <h2>{{ title }}<slot name="tip" /></h2>
    </div>
    <div class="username fr">
      <a href="javascript:;">{{ username }}</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: String
  },
  computed: {
    ...mapState(['username'])
  }
}
</script>
<style lang='less' scoped>
.order-header {
  padding: 30px 0;
  .header-logo {
    float: left;
  }
  .title,
  .username {
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title {
    margin-left: 54px;
    h2 {
      font-size: 28px;
      color: #333;
    }
    span {
      font-size: 14px;
      margin-left: 17px;
      color: #999;
      font-weight: 200;
    }
  }
  .username {
    color: #666;
    font-size: 20px;
  }
}
</style>