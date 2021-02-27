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
    carts: [],
    toCheckOut: [],
    history: [],
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
    setCarts (state, payload) {
      state.carts = payload
    },
    setHistory (state, payload) {
      state.history = payload
    },
    setDataUser (state, payload) {
      state.dataUser = payload
    },
    setIsLoading (state, payload) {
      state.isLoading = payload
    },
    setToCheckOut (state, payload) {
      state.toCheckOut = payload
    }
  },
  actions: {
    postRegister (context, payload) {
      context.commit('setIsLoading', true)
      const { name, email, password } = payload
      axios({
        method: 'POST',
        url: '/user/register',
        data: {
          name, email, password
        }
      })
        .then(({ data }) => {
          context.commit('setIsLoading', false)
          Vue.toasted.show('Successfuly registered', {
            theme: 'outline',
            position: 'top-center',
            duration: 2000
          })
          router.push('/login')
        })
        .catch(err => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
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
          context.commit('setDataUser', dataUser)
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
          context.commit('setIsLoading', false)
          context.commit('setProducts', data.reverse())
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
          context.commit('setIsLoading', false)
          context.commit('setBanners', data.reverse())
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    fetchCart (context) {
      context.commit('setIsLoading', true)
      axios({
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        method: 'GET',
        url: '/cart'
      })
        .then(({ data }) => { // data is array of products
          context.commit('setIsLoading', false)
          context.commit('setCarts', data.reverse())
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    firstFetchCart (context) {
      context.commit('setIsLoading', true)
      axios({
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        method: 'GET',
        url: '/cart'
      })
        .then(({ data }) => { // data is array of products
          context.commit('setToCheckOut', data)
          context.commit('setIsLoading', false)
          context.commit('setCarts', data.reverse())
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    fetchHistory (context) {
      context.commit('setIsLoading', true)
      axios({
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        method: 'GET',
        url: '/cart/history'
      })
        .then(({ data }) => { // data is array of products
          context.commit('setIsLoading', false)
          context.commit('setHistory', data.reverse())
        })
        .catch((err) => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    postCart (context, payload) {
      context.commit('setIsLoading', true)
      const { ProductId } = payload
      axios({
        method: 'POST',
        url: '/cart',
        data: {
          ProductId
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((res) => {
          context.commit('setIsLoading', false)
          Vue.toasted.show('Product added to your cart', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 1500
          })
        })
        .catch(err => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    patchCartQty (context, payload) {
      context.commit('setIsLoading', true)
      const { cartId, qty } = payload
      axios({
        method: 'PATCH',
        url: '/cart/' + cartId,
        data: {
          qty
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((res) => {
          context.commit('setIsLoading', false)
          context.dispatch('fetchCart')
          Vue.toasted.show('Quantity updated', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 1500
          })
        })
        .catch(err => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    deleteCart (context, payload) {
      context.commit('setIsLoading', true)
      const { cartId } = payload
      axios({
        method: 'DELETE',
        url: '/cart/' + cartId,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((res) => {
          context.commit('setIsLoading', false)
          Vue.toasted.show('successfully removed', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 1500
          })
          context.dispatch('fetchCart')
        })
        .catch(err => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    },
    updateToCheckOut (context, payload) {
      const newList = this.state.toCheckOut.filter(el => el.id !== payload)
      return newList
    },
    checkOut (context, payload) {
      context.commit('setIsLoading', true)
      const arrOfCartId = []
      this.state.carts.forEach(el => arrOfCartId.push(el.id))
      axios({
        method: 'PUT',
        url: '/cart',
        data: {
          arrOfCartId
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((res) => {
          context.commit('setIsLoading', false)
          Vue.toasted.show('Thanks for shopping with us!', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 1500
          })
          router.push('/product')
        })
        .catch(err => {
          context.commit('setIsLoading', false)
          Swal.fire('Oops...', err.response.data.message, 'error')
          console.log(err)
        })
    }
  },
  modules: {
  }
})
