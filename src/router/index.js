import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
// 异步加载
const Goods = () => import('@/views/Goods')
const GoodsList = () => import('@/views/Goods/GoodsList')
const Category = () => import('@/views/Goods/Category')
const AddGoods = () => import('@/views/Goods/AddGoods')

const routes = [
  {
    path: '/',
    component: Layout,
    children:[
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/goods',
        component: Goods,
        children: [
          {
            path: 'list',
            name: 'list',
            component: GoodsList
          },
          {
            path: 'category',
            name: 'category',
            component: Category
          },
          {
            path: 'addgoods',
            name: 'addgoods',
            component: AddGoods,
            //路由元信息
            meta: {
              isShow: true,
              activeMenu: "/goods/list",
              title: "添加商品",
            },
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
