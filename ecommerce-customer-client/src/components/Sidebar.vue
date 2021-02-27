<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-1 d-md-block bg-dark sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link :to="{name: 'Products'}" class="nav-link text-center" href="#">
            <i class="fas fa-store"></i>
            <p>Products</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'Cart'}" class="nav-link text-center" href="#">
            <i class="fas fa-shopping-bag"></i>
            <p>Carts</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'History'}" class="nav-link text-center" href="#">
            <i class="fas fa-history"></i>
            <p>History</p>
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
