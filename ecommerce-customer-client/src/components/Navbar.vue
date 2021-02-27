<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-4" href="#">KAWNA</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav px-3">
        <li v-if="!loggedIn" @click.prevent="goToLogin" class="nav-item text-nowrap">
          <a class="nav-link" href="#">Log In</a>
        </li>
        <li v-if="loggedIn" @click.prevent="loggingOut" class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </header>
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
    loggingOut () {
      this.$store.dispatch('loggingOut')
    },
    goToLogin () {
      this.$router.push('/login')
    }
  },
  computed: {
    loggedIn () {
      return localStorage.getItem('access_token')
    }
  }
}
</script>
<style scoped>
.router-link-active {
  color:gray;
}
</style>
