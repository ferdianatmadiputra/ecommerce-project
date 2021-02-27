<template>
  <div class="card p-2 shadow-sm my-1">
    <div class="row align-items-center justify-content-center">
      <div class="col-12 col-lg-6 col-xl-2 align-items-center">
        <img class="mx-auto" :src="product.image_url" width="100px" height="100px">
      </div>
      <div class="col-12 col-lg-6 col-xl-3">
        <p class="mb-2 mx-auto">{{ product.name }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-2">
        <p class="mb-2">{{ product.category }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-2">
        <p class="mb-2">{{ formatToIdr(product.price) }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-1">
        <p class="mb-2">{{ product.stock }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-2">
          <a class="btn btn-outline-secondary p-1 m-1 display-5"
          @click.prevent="getEditProduct">
            <i class="far fa-edit"></i>
            Edit
          </a>
          <a class="btn btn-outline-secondary p-1 display-5"
          @click.prevent="delProduct">
            <i class="far fa-edit"></i>
            Delete
          </a>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
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
    getEditProduct () {
      this.$router.push(`/product/${this.product.id}`)
    },
    delProduct () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteProduct', { id: this.product.id })
        }
      })
    }
  }
}
</script>
