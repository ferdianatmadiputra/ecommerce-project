import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsPage from '../views/ProductsPage.vue'
import AddProductPage from '../views/AddProductPage.vue'
import EditProductPage from '../views/EditProductPage.vue'
import BannersPage from '../views/BannersPage.vue'
import AddBannerPage from '../views/AddBannerPage.vue'
import EditBannerPage from '../views/EditBannerPage.vue'
import LoginPage from '../views/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductsPage',
    component: ProductsPage
  },
  {
    path: '/product',
    name: 'AddProductPage',
    component: AddProductPage
  },
  {
    path: '/product/:product_id',
    name: 'EditProductPage',
    component: EditProductPage
  },
  {
    path: '/banner',
    name: 'BannersPage',
    component: BannersPage
  },
  {
    path: '/addbanner',
    name: 'AddBannerPage',
    component: AddBannerPage
  },
  {
    path: '/banner/:banner_id',
    name: 'EditBannerPage',
    component: EditBannerPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '*',
    component: { template: '<p>404 not found</p>' }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const privateRoutes = ['ProductsPage', 'BannersPage', 'AddProductPage', 'EditProductPage', 'AddBannerPage', 'EditBannerPage']
  if (!localStorage.access_token && privateRoutes.includes(to.name)) {
    next({ name: 'Login' })
  } else if (localStorage.access_token && !privateRoutes.includes(to.name)) {
    next({ name: 'ProductsPage' })
  } else {
    next()
  }
})

export default router
