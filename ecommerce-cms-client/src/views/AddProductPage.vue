<template>
    <div class="row">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
        <div class="container">
          <div class="p-1 my-3" id="kanban-title">
            <h1 style="text-align:center">
              &nbsp;Add Product
            </h1>
          </div>
          <!--toolbar-->
          <div class="row align-items-center justify-content-end p-2" id="addproduct">
            <div class="p-3 mx-auto rounded bg-gradient" style="max-width: 400px; text-align:center">
              <form v-on:submit.prevent="submitNewProduct" action="#" method="post" autocomplete="off">
                <div class="mb-3 form-floating">
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    placeholder="aaa"
                    id="productName"
                  />
                  <label for="productName" class="col-form-label">Product Name</label>
                </div>

                <div class="mb-3 form-floating">
                  <input
                    v-model="image_url"
                    type="text"
                    class="form-control"
                    placeholder="aaa"
                    id="productImg"
                  />
                  <label for="productImg" class="col-form-label">Image URL</label>
                </div>

                <div class="mb-3 form-floating">
                  <select v-model="category" name="productCategory" id="productCategory" class="form-control">
                    <option selected disabled value="">choose category</option>
                    <option value="Slingbag">Slingbag</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Backpack">Backpack</option>
                    <option value="Tote Bag">Tote Bag</option>
                    <option value="Clutch">Clutch</option>
                    <option value="Waist Bag">Waist Bag</option>
                  </select>
                  <label for="productCategory" class="col-form-label">Category</label>
                </div>

                <div class="mb-3 form-floating">
                  <input
                    v-model="stock"
                    type="number"
                    class="form-control"
                    placeholder="aaa"
                    id="productStock"
                  />
                  <label for="productStock" class="col-form-label">Stock</label>
                </div>
                <div class="mb-3 form-floating">
                  <input
                    v-model="price"
                    type="number"
                    class="form-control"
                    placeholder="aaa"
                    id="productPrice"
                  />
                  <label for="productPrice" class="col-form-label">Price</label>
                </div>
                <div class="mb-3">
                  <input
                    v-if="!isLoading"
                    type="submit"
                    id="submitNewProduct"
                    class="btn btn-primary"
                    value="Create Product"
                  />
                  <div v-if="isLoading" class="spinner-border text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <router-link :to="{name: 'ProductsPage'}" class="btn btn-outline-secondary">
                    <span>
                      Cancel
                    </span>
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>
<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
export default {
  name: 'AddProductPage',
  components: {
    Navbar, Sidebar
  },
  data () {
    return {
      name: '',
      image_url: '',
      stock: '',
      category: '',
      price: ''
    }
  },
  methods: {
    submitNewProduct () {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category
      })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
<style scoped>
</style>
