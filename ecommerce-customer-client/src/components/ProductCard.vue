<template>
  <!-- <div class="col-12 col-lg-6 col-xl-3"> -->
  <div class="col">
    <div class="card p-2 shadow-sm my-1"
    @mouseover="hover = true" @mouseleave="hover=false"
    @click.prevent="addToCart">
      <div class="row align-items-center justify-content-center">
          <img class="product mx-auto" :src="product.image_url">
      </div>
      <div class="row pt-2">
        <p class="h6">{{ product.name }}</p>
      </div>
        <div class="row">
          <p class="h6">{{ formatToIdr(product.price) }}</p>
        </div>
        <div class="row pt-2">
          <p class="h6" v-if="product.stock>0">
            <span v-if="!hover">Available </span>
            <span class="text-right">
            <a v-if="hover" class="text-warning text-end">
              <i class="fas fa-cart-plus"></i>
              &nbsp;Add To Cart
            </a>
            </span>
          </p>
          <p class="h6" v-if="product.stock<1">Out of Stock</p>
        </div>
    </div>
  </div>
</template>
<script>
// product name, category, stock, price, image_url
export default {
  data () {
    return {
      hover: false
    }
  },
  name: 'ProductCard',
  props: [
    'product'
  ],
  methods: {
    formatToIdr (num) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
      return formatter.format(num)
    },
    addToCart () {
      if (!localStorage.getItem('access_token')) {
        this.$router.push('/login')
      } else {
        const ProductId = this.product.id
        this.$store.dispatch('postCart', { ProductId })
      }
    }
  }
}
</script>
<style scoped>
.card:hover{
  cursor: pointer;
  transform: scale(1.005);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}
.product {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
