<template>
  <div class="row">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
      <div class="container">
        <div class="p-1 my-3" id="cartpage-title">
          <h1 style="text-align:center">
            &nbsp;Your Order History
          <div v-if="isLoading === true" class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          </h1>
        </div>
        <!--toolbar-->
        <div v-if="history.length === 0 && isLoading === false" class="container">
          <lottie-player class="mx-auto" src="https://assets4.lottiefiles.com/packages/lf20_V3h0cE.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
          <h3 class='text-center'>No History yet, lets order more!</h3>
        </div>
        <div v-if="history.length > 0" class="row">
          <!--start card product-->
          <div class="col-9">
            <HistoryCard
            v-for="cart in history"
            :key="cart.id"
            :cart="cart"
            :product="cart.Product"
            ></HistoryCard>
          </div>
          <div class="col-3">
            <p>Total Spent:</p>
            <p>{{formatToIdr(totalSpent)}}</p>
          </div>
        </div> <!--end of product board-->
      </div> <!--end of product content-->
    </main>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import HistoryCard from '../components/HistoryCard.vue'
export default {
  name: 'HistoryPage',
  components: {
    Navbar, Sidebar, HistoryCard
  },
  computed: {
    history () {
      return this.$store.state.history
    },
    totalSpent () {
      let total = 0
      this.$store.state.history.forEach((el) => { total = total + (el.qty * el.Product.price) })
      return total
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    formatToIdr (num) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
      return formatter.format(num)
    }
  },
  created () {
    this.$store.dispatch('fetchHistory')
  }
}
</script>
<style scoped>
</style>
