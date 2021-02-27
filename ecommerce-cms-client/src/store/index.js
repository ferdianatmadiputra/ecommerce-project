import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    isLogin: false,
    page: 'login',
    dataUser: {},
    isLoading: false
  },
  mutations: {
    setBanners (state, payload) {
      state.banners = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    loggingIn (state, payload) {
      state.dataUser = payload
      state.isLogin = true
      state.page = 'home'
    },
    loggingOut (state) {
      state.isLogin = false
      state.page = 'login'
    },
    setIsLoading (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    postLogin (context, payload) {
      context.commit('setIsLoading', true)
      const { email, password } = payload
      let dataUser = {}
      axios({
        method: 'POST',
        url: '/user/login',
        data: {
          email, password
        }
      })
        .then(({ data }) => {
          dataUser = data.dataUser
          return localStorage.setItem('access_token', data.access_token)
        })
        .then((res) => {
          context.commit('setIsLoading', false)
          context.commit('loggingIn', dataUser)
          router.push('/')
        })
        .catch(err => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    loggingOut (context) {
      localStorage.clear()
      context.commit('loggingOut')
      router.push('/login')
    },
    fetchProducts (context) {
      context.commit('setIsLoading', true)
      axios({
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        method: 'GET',
        url: '/product'
      })
        .then(({ data }) => { // data is array of products
          context.commit('setProducts', data.reverse())
          context.commit('setIsLoading', false)
        })
        .catch((err) => {
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
          context.commit('setIsLoading', false)
        })
    },
    editProduct (context, payload) {
      context.commit('setIsLoading', true)
      axios({
        method: 'PUT',
        url: '/product/' + payload.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        }
      })
        .then(({ data }) => {
          context.commit('setIsLoading', false)
          context.dispatch('fetchProducts')
          router.push('/home')
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    deleteProduct (context, payload) {
      context.commit('setIsLoading', true)
      // payload is { id from route params }
      axios({
        method: 'DELETE',
        url: '/product/' + payload.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setIsLoading', false)
          Swal.fire(
            'Deleted!',
            'The Product has been deleted.',
            'success'
          )
          context.dispatch('fetchProducts')
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    addProduct (context, payload) {
      context.commit('setIsLoading', true)
      axios({
        method: 'POST',
        url: '/product',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category
        }
      })
        .then(({ data }) => {
          context.commit('setIsLoading', false)
          context.dispatch('fetchProducts')
          router.push('/home')
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    fetchBanners (context) {
      context.commit('setIsLoading', true)
      axios({
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        method: 'GET',
        url: '/banner'
      })
        .then(({ data }) => { // data is array of products
          context.commit('setBanners', data.reverse())
          context.commit('setIsLoading', false)
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    addBanner (context, payload) {
      context.commit('setIsLoading', true)
      axios({
        method: 'POST',
        url: '/banner',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          title: payload.title,
          status: payload.status
        }
      })
        .then(({ data }) => {
          context.commit('setIsLoading', false)
          context.dispatch('fetchBanners')
          router.push('/banner')
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    editBanner (context, payload) {
      context.commit('setIsLoading', true)
      axios({
        method: 'PUT',
        url: '/banner/' + payload.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: payload.title,
          image_url: payload.image_url,
          status: payload.status
        }
      })
        .then(({ data }) => {
          context.commit('setIsLoading', false)
          context.dispatch('fetchBanners')
          router.push('/banner')
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    deleteBanner (context, payload) {
      // payload is { id from route params }
      context.commit('setIsLoading', true)
      axios({
        method: 'DELETE',
        url: '/banner/' + payload.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setIsLoading', false)
          Swal.fire(
            'Deleted!',
            'The Banner has been deleted.',
            'success'
          )
          context.dispatch('fetchBanners')
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    }
  },
  getters: {
  },
  modules: {
  }
})
