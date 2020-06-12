<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { getUserInfo } from 'network/request.js'
export default {
  // 单页面，页面内跳转不会触发mounted事件，需要刷新或新开一个标签页
  mounted() {
    if (this.$cookies.get('userId')) {
      this._getUserInfo()
    }
  },
  methods: {
    async _getUserInfo() {
      const data = await getUserInfo()
      if (data) {
        this.$store.dispatch('saveUserName', data.username)
        this.$store.dispatch('saveCartCnt', data.cartCnt)
      }else{
        this.$cookies.remove('userId')
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>


