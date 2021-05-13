import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Logo from '@/page/home/manageLogo'
import Carousel from '@/page/home/manageCarousel'
import Nav from '@/page/home/manageNav'
import GoodsList from '@/page/goods/goodslist'
import OffSaleGoodsList from '@/page/goods/offsaleGoodsList'
import AddGoods from '@/page/goods/addGoods'
import EditGoods from '@/page/goods/editGoods'
import Attribute from '@/page/goods/attribute'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/manage/logo'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/manage/logo',
          name: 'logo',
          component: Logo
        },
        {
          path: '/home/manage/carousel',
          name: 'carousel',
          component: Carousel
        },
        {
          path: '/home/manage/nav',
          name: 'nav',
          component: Nav
        },
        {
          path: '/goods/manage/list',
          name: 'goodslist',
          component: GoodsList
        },
        {
          path: '/goods/manage/list/offsale',
          name: 'offsalegoodslist',
          component: OffSaleGoodsList
        },
        {
          path: '/goods/manage/classification',
          name: 'classification',
          component: Nav
        },
        {
          path: '/goods/manage/addgoods',
          name: 'addgoods',
          component: AddGoods
        },
        {
          path: '/goods/manage/editgoods',
          name: 'editgoods',
          component: EditGoods
        },
        {
          path: '/goods/manage/attribute',
          name: 'attribute',
          component: Attribute
        }
      ]
    }
  ]
})
