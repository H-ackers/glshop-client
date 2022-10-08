import Vue from 'vue'
import VueRouter from 'vue-router'
import MSitePage from '../pages/MSite/MSitePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/msite',
    name: 'msite',
    component: MSitePage,
    meta: {
      showFooter:true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../pages/Search/SearchPage.vue'),
    meta: {
      showFooter:true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "order" */ '../pages/Order/OrderPage.vue'),
    meta: {
      showFooter:true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../pages/Profile/ProfilePage.vue'),
    meta: {
      showFooter:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login/LoginPage.vue')
  },
  {path:'/',redirect:'/msite'}
]

const router = new VueRouter({
  routes
})

export default router
