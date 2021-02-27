<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-1 d-md-block bg-dark sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link :to="{name: 'ProductsPage'}" class="nav-link" href="#">
            Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'AddProductPage'}" class="nav-link" href="#">
            Add Product
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'BannersPage'}" class="nav-link" href="#">
            Banners
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'AddBannerPage'}" class="nav-link" href="#">
            Add Banner
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Sidebar'
}
</script>
<style scoped>
.router-link-active {
  background-color: #f0ad4e;
}
</style>
