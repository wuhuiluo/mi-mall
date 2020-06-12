import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad  from 'vue-lazyload'
import VueCookies from 'vue-cookies'


import 'assets/css/reset.less';

import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(VueLazyLoad,{
  // preLoad: 1.3,
  // 加载显示图片
  loading: '/imgs/loading-svg/loading-bars.svg'
});
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  render: h => h(App),
  // 挂载到Vue示例上
  router,
  store
}).$mount('#app')
