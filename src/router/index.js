import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import GoodsList from '@/pages/goods/goodsList'
import GoodsDetails from '@/pages/goods/goodsDetails'
import DetailsMain from '@/pages/goods/details/detailsMain'
import DetailsParameter from '@/pages/goods/details/detailsParameter'
import DetailsComment from '@/pages/goods/details/detailsComment'

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
    }
  ]
})
