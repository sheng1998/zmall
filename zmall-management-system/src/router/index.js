import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Logo from '@/page/manageLogo'
import Carousel from '@/page/manageCarousel'
import Nav from '@/page/manageNav'
import GoodsList from '@/page/goodslist'
import AddGoods from '@/page/addGoods'
import EditGoods from '@/page/editGoods'
import Attribute from '@/page/attribute'

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
