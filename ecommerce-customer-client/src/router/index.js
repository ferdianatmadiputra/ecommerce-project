import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import CartPage from '@/views/CartPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product',
    name: 'Products',
    component: ProductPage
  },
  {
    path: '/',
    name: 'Home',
    component: ProductPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  try {
    const privateRoutes = ['Products', 'Cart', 'History']
    if (!localStorage.getItem('access_token') && privateRoutes.includes(to.name)) {
      // console.log(to.name)
      next({ name: 'Login' })
    } else if (localStorage.access_token && !privateRoutes.includes(to.name)) {
      next({ name: 'Products' })
    } else {
      next()
    }
  } catch (err) {
    console.log(err, '<<<<<< ini error di router lho')
  }
})

export default router
