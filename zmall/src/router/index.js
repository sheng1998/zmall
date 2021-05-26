import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Register from '@/pages/register/register'
import Home from '@/pages/home/home'
import Error from '@/pages/404/error'
import GoodsList from '@/pages/goods/goodsList'
import GoodsDetails from '@/pages/goods/goodsDetails'
import DetailsMain from '@/pages/goods/details/detailsMain'
import DetailsParameter from '@/pages/goods/details/detailsParameter'
import DetailsComment from '@/pages/goods/details/detailsComment'
import ShoppingCar from '@/pages/goods/goodscar/shoppingCar'
import GoodsOrder from '@/pages/goods/order/order'
import Personal from '@/pages/personal/personal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/404',
      name: 'error',
      component: Error
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/goods/list',
      name: 'list',
      component: GoodsList
    },
    {
      path: '/search',
      name: 'search',
      component: GoodsList
    },
    {
      path: '/goods/details',
      name: 'details',
      component: GoodsDetails,
      redirect: '/goods/details/main',
      children: [
        {
          path: 'main',
          name: 'detailsMain',
          component: DetailsMain
        },
        {
          path: 'parameter',
          name: 'detailsParameter',
          component: DetailsParameter
        },
        {
          path: 'comment',
          name: 'detailsComment',
          component: DetailsComment
        }
      ]
    },
    {
      path: '/shoppingcar',
      name: 'shoppingcar',
      component: ShoppingCar
    },
    {
      path: '/goods/order',
      name: 'goodsorder',
      component: GoodsOrder
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
