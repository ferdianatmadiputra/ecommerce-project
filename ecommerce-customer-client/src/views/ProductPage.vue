<template>
  <div class="row">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
      <div class="container mx-auto">
        <BannerContainer></BannerContainer>
      </div>
      <div class="container">
        <div class="p-1 my-3" id="productpage-title">
          <h1 style="text-align:center">
            &nbsp;Products
          <div v-if="isLoading === true" class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          </h1>
        </div>
        <!--toolbar-->
        <div class="navbar justify-content-between">
          <div class="row">
            <div class="col-auto">
              <input v-model="filter" class="form-control inline-form" type="text" placeholder="Search by name">
            </div>
            <!-- <div class="col-auto">
              <a class="search-btn">
              <i class="fas fa-search"></i>
              </a>
            </div> -->
          </div>
          <b-button-group class="mx-1">
            <b-button @click.prevent='changeCategory("")'>All products</b-button>
            <b-button @click.prevent='changeCategory("Slingbag")'>Sling Bag</b-button>
            <b-button @click.prevent='changeCategory("Wallet")'>Wallet</b-button>
            <b-button @click.prevent='changeCategory("Backpack")'>Backpack</b-button>
            <b-dropdown class="mx-1" right text="other">
              <b-dropdown-item @click.prevent='changeCategory("Tote Bag")'>Tote Bag</b-dropdown-item>
              <b-dropdown-item @click.prevent='changeCategory("Clutch")'>Clutch</b-dropdown-item>
              <b-dropdown-item @click.prevent='changeCategory("Waist Bag")'>Waist Bag</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>

        <div v-if="filter.length === 0 && category.length === 0" class="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2">
          <!--start card product-->
            <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            ></ProductCard>
        </div> <!--end of product board-->

        <div v-if="filter.length > 0" class="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2">
          <!--start card product-->
            <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            ></ProductCard>
        </div> <!--end of product board-->
        <div v-if="category.length > 0" class="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2">
          <!--start card product-->
            <ProductCard
            v-for="product in filteredByCategory"
            :key="product.id"
            :product="product"
            ></ProductCard>
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
import BannerContainer from '../components/BannerContainer.vue'

export default {
  data () {
    return {
      filter: '',
      category: ''
    }
  },
  name: 'ProductsPage',
  components: {
    Sidebar,
    Navbar,
    ProductCard,
    BannerContainer
  },
  methods: {
    changeCategory (val) {
      this.category = val
      this.filter = ''
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    },
    filteredProducts () {
      const arrproducts = this.$store.state.products
      const output = arrproducts.filter(product => product.name.toLowerCase().includes(this.filter.toLowerCase()))
      return output
    },
    filteredByCategory () {
      const arrproducts = this.$store.state.products
      const output = arrproducts.filter(product => product.category === this.category)
      return output
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>
<style scoped>
</style>
