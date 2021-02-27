<template>
    <div class="card p-2 shadow-sm my-1">
    <div class="row align-items-center">
      <div class="col-12 col-lg-6 col-xl-2">
        <img class="mx-auto" :src="product.image_url" width="100px" height="100px">
      </div>
      <div class="col-12 col-lg-6 col-xl-4">
        <p class="mb-2 mx-auto">{{ product.name }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-3">
        <p class="mb-0"> Unit Price: </p>
        <p class="mb-2">{{ formatToIdr(product.price) }}</p>
        <p class="mb-0">Qty: {{cart.qty}}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-3">
        <p class="text-center">{{formatDate(cart.updatedAt)}}</p>
      </div>

    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'CartCard',
  props: ['cart', 'product'],
  data () {
    return {
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
    formatDate (date) {
      return moment(date).fromNow()
    }
  },
  computed: {
    quantity () {
      return this.cart.qty
    }
  }
}
</script>
<style scoped>
</style>
