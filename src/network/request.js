import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* 请求基础值 */
axios.defaults.baseURL = '/mi/'
axios.defaults.timeout = 15000
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

/* 请求拦截 */
axios.interceptors.request.use(req => {
  NProgress.start();
  req.headers.Authorization = window.sessionStorage.getItem('token');
  req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (req.method === 'post' || req.method === 'put') {
    req.data = qs.stringify({
      ...req.data
    })
  }
  return req;
})

/* 响应错误拦截 */
axios.interceptors.response.use(response => {
  NProgress.done();
  let { meta, data } = response.data;
  if (meta.status !== 200) {
    if (meta.status === 403) {
      if (location.hash != '#/index') {
        window.location.href = '/#/login'
      }
    } else {
      Vue.prototype.$message.error(meta.msg)
      return new Promise(() => { })
      // return Promise.reject(meta);
    }
  }
  return data;
}, (err) => {
  NProgress.done();
  Vue.prototype.$message.error("快滚！快滚！快滚！服务器内部错误，你无法解决！")
  return new Promise(() => { })
  // return Promise.reject(err);
})

// 获取导航栏数据
export function getNavItem() {
  return axios.get('navItem')
}

// 获取首页分类列表
export function getCateList() {
  return axios.get('leftCategory')
}

// 获取首页轮播图
export function getBanners() {
  return axios.get('banners')
}

// 获取首页产品列表
export function getHomeProductList() {
  return axios.get('homeProduct')
}

// 获取产品详情
export function getProductDetail(id) {
  return axios.get(`product/${id}`)
}

// 登录
export function postLogin(param) {
  return axios.post('login', param)
}

// 退出
export function postLogout() {
  return axios.post('logout')
}

// 获取用户详情
export function getUserInfo() {
  return axios.get(`user`)
}

// 添加购物车
export function addCart(goodsId) {
  return axios.post(`cart?goodsId=${goodsId}`)
}

// 获取购物车数量
export function getCartCnt() {
  return axios.get(`cart/count`)
}

// 获取购物车列表
export function getCartList(param) {
  return axios.get(`cart/list`, { params: param })
}

// 购物车全选
export function cartSelectAll(selectAll) {
  return axios.put(`cart/selectAll/${selectAll}`)
}

// 修改购物车数量
export function updCartCnt(id, param) {
  return axios.put(`cart/${id}`, param)
}

// 删除购物车
export function delCart(id) {
  return axios.delete(`cart/${id}`)
}

// 收货地址列表
export function getAddrList() {
  return axios.get(`address/list`)
}

// 新增收货地址列表
export function addAddress(param) {
  return axios.post('address', param)
}

// 修改收货地址
export function updAddress(id, param) {
  return axios.put(`address/${id}`, param)
}

// 删除收货地址
export function delAddress(id) {
  return axios.delete(`address/${id}`)
}

// 创建订单
export function addOrder(param) {
  return axios.post('order', param)
}

// 订单详情
export function getOrder(orderId) {
  return axios.get(`order/${orderId}`)
}

// 订单列表
export function getOrderList(param) {
  return axios.get(`order/list`, { params: param })
}

// 支付
export function pay(param) {
  return axios.post(`pay/submit`, param)
}
