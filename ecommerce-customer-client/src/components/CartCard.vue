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
        <p> Unit Price </p>
        <p class="mb-2">{{ formatToIdr(product.price) }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-3">
        <p class="mb-0 text-center  ">Qty:</p>
        <div class="row align-items-center px-3">
          <div class="col-2 m-0 px-0 py-1">
            <a @click.prevent="decreaseQty" class="btn btn-outline-light text-secondary p-1 py-1 rounded btn-block">
              <i class="fas fa-minus"></i>
            </a>
          </div>
          <div class="col-8 m-0 p-0">
            <input type="number" disabled v-model='quantity' class="form-control form-control-sm mx-0">
          </div>
          <div class="col-2 m-0 px-0">
            <a @click.prevent="increaseQty" class="btn btn-outline-light text-secondary p-1 py-1 rounded btn-block">
              <i class="fas fa-plus"></i>
            </a>
          </div>
        </div>
        <div @click.prevent="deleteAttemp" class="btn btn-outline-secondary p-1 m-0 btn-block">Remove</div>
      </div>

    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
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
    increaseQty () {
      if (this.quantity + 1 <= this.product.stock) {
        this.$store.dispatch('patchCartQty', { cartId: this.cart.id, qty: this.quantity + 1 })
      } else {
        Swal.fire('denied', 'stock is not sufficient', 'info')
      }
    },
    decreaseQty () {
      if (this.quantity > 1) {
        this.$store.dispatch('patchCartQty', { cartId: this.cart.id, qty: this.quantity - 1 })
      } else {
        Swal.fire('denied', 'qty cannot less than 1, please remove from cart instead', 'info')
      }
    },
    updateQty () {
      console.log('triggered')
      this.$store.dispatch('patchCartQty', { cartId: this.cart.id, qty: this.quantity })
    },
    deleteAttemp () {
      Swal.fire({
        title: 'Are you sure?',
        text: `Remove ${this.product.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteCart', { cartId: this.cart.id })
        }
      })
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
