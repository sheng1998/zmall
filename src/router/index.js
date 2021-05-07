import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import GoodsList from '@/pages/goods/goodsList'
import GoodsDetails from '@/pages/goods/goodsDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: GoodsList
    },
    {
      path: '/search',
      name: 'search',
      component: GoodsList
    },
    {
      path: '/details',
      name: 'details',
      component: GoodsDetails
    }
  ]
})
