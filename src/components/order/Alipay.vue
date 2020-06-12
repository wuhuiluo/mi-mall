<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
import Loading from 'components/public/Loading'
import { pay } from 'network/request.js'
export default {
  components: {
    Loading
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true,
      timer: ''
    }
  },
  mounted() {
    this._paySubmit()
  },
  methods: {
    async _paySubmit() {
      let content = await pay({
        orderId: this.orderId,
        orderName: '所以我放弃了编程',
        amount: 0.01, //单位元
        payType: 1 //1支付宝，2微信
      })
      this.content = content
      setTimeout(() => {
        document.forms[0].submit()
      }, 100)
    },
    loopOrderState() {
      clearTimeout(this.timer)
      let timer = setInterval(() => {
        // todo 获取订单状态并且跳转
        if (timer == 10) {
          clearInterval(this.timer)
        }
      }, 1000)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>