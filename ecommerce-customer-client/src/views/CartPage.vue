<template>
  <div class="row">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
      <div class="container">
        <div class="p-1 my-3" id="cartpage-title">
          <h1 style="text-align:center">
            &nbsp;Your Cart
          <div v-if="isLoading === true" class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          </h1>
        </div>
        <!--toolbar-->
          <div v-if="carts.length === 0 && isLoading === false" class="container">
            <lottie-player class="mx-auto" src="https://assets2.lottiefiles.com/packages/lf20_cy82iv.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
            <h3 class='text-center'>Your Cart is empty, lets add to cart more!</h3>
          </div>
        <div v-if="carts.length > 0" class="row">
          <!--start card product-->
          <div class="col-9">
            <CartCard
            v-for="cart in carts"
            :key="cart.id"
            :cart="cart"
            :product="cart.Product"
            ></CartCard>
          </div>
          <div class="col-3">
            <p>Total:</p>
            <p>{{formatToIdr(totalPrice)}}</p>
            <a class="btn btn-outline-primary" @click.prevent="checkOut">
              Checkout
            </a>
          </div>
        </div> <!--end of product board-->
      </div> <!--end of product content-->
    </main>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import CartCard from '../components/CartCard.vue'
import Swal from 'sweetalert2'
export default {
  name: 'CartPage',
  components: {
    Sidebar,
    Navbar,
    CartCard
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    totalPrice () {
      let total = 0
      this.$store.state.carts.forEach((el) => { total = total + (el.qty * el.Product.price) })
      return total
    }
  },
  methods: {
    formatToIdr (num) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
      return formatter.format(num)
    },
    checkOut () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Complete CheckOut?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I buy it all!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('checkOut')
        }
      })
    }
  },
  created () {
    this.$store.dispatch('firstFetchCart')
  }
  // show cart, update qty, remove,
}
</script>
<style scoped>
</style>
