import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home.vue'
import Index from 'views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
      }, {
        path: '/product/:id',
        name: 'product',
        component: () => import('views/Product.vue')
      }, {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('views/Detail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/Login.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('views/Cart.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('views/Order.vue'),
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: () => import('components/order/OrderList.vue')
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: () => import('components/order/OrderConfirm.vue')
      },
      {
        path: 'pay',
        name: 'order-pay',
        component: () => import('components/order/OrderPay.vue')
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: () => import('components/order/Alipay.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
