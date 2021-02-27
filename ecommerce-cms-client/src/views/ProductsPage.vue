<template>
  <div class="row">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
      <div class="container">
        <div class="p-1 my-3" id="kanban-title">
          <h1 style="text-align:center">
            &nbsp;Products
            <div v-if="isLoading === true" class="spinner-border text-dark" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </h1>
        </div>
        <!--toolbar-->
        <div class="row align-items-center justify-content-end p-2" id="toolbar">
          <div class="col-auto">
            <router-link :to="{name: 'AddProductPage'}" class="btn btn-outline-secondary btn-sm p-2">
                <i class="far fa-trash-alt"></i>
                <span>
                  Add New Product
                </span>
            </router-link>
          </div>
        </div>
        <div class="row">
          <!--start table product-->
          <div class="col-12">
            <div class="card border-warning my-2 shadow">
              <div class="card-body m-0 p-1">
                <!--sebuah Title-->
                <div class="card p-2 shadow-sm my-1 bg-dark text-warning">
                  <div class="row">
                    <div class="col-12 col-lg-6 col-xl-2">
                      <p class="mb-2">PICTURE</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-3">
                      <p class="mb-2">PRODUCT NAME</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-2">
                      <p class="mb-2">CATEGORY</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-2">
                      <p class="mb-2">PRICE</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-1">
                      <p class="mb-2">STOCK</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-2">
                      <p class="mb-2">ACTIONS</p>
                    </div>
                  </div>
                </div>
                <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                ></ProductCard>
              </div>
            </div>
          </div>
        </div> <!--end of product board-->
      </div> <!--end of product content-->
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import ProductCard from '../components/ProductCard.vue'

export default {
  data () {
    return {}
  },
  name: 'ProductsPage',
  components: {
    Sidebar,
    Navbar,
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>
