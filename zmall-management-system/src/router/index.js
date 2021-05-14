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
import StockWarning from '@/page/stockWarning/stockWarning'

Vue.use(Router)

const router = new Router({
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
        // 在售商品列表页面路由
        {
          path: '/goods/manage/list',
          name: 'goodslist',
          component: GoodsList
        },
        // 下架商品列表页面路由
        {
          path: '/goods/manage/list/offsale',
          name: 'offsalegoodslist',
          component: OffSaleGoodsList
        },
        // 分类管理页面路由
        {
          path: '/goods/manage/classification',
          name: 'classification',
          component: Nav
        },
        // 添加商品页面路由
        {
          path: '/goods/manage/addgoods',
          name: 'addgoods',
          component: AddGoods
        },
        // 编辑商品页面路由
        {
          path: '/goods/manage/editgoods',
          name: 'editgoods',
          component: EditGoods
        },
        // 属性管理页面路由
        {
          path: '/goods/manage/attribute',
          name: 'attribute',
          component: Attribute
        },
        // 库存预警页面路由
        {
          path: '/manage/stockwarning',
          name: 'stockwarning',
          component: StockWarning
        }
      ]
    }
  ]
})

export default router
