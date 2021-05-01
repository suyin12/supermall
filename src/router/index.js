import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装插件
Vue.use(VueRouter)

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

//2.创建router对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      keepAlive: false,//不需要缓存
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.导出
export default router
