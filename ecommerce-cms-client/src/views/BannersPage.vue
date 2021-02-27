<template>
  <div class="row">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
      <div class="container">
        <div class="p-1 my-3" id="kanban-title">
          <h1 style="text-align:center">
            &nbsp;Banners
            <div v-if="isLoading === true" class="spinner-border text-dark" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </h1>
        </div>
        <!--toolbar-->
        <div class="row align-items-center justify-content-end p-2" id="toolbar">
          <div class="col-auto">
            <router-link :to="{name: 'AddBannerPage'}" class="btn btn-outline-secondary btn-sm p-2">
                <i class="far fa-trash-alt"></i>
                <span>
                  Add New Banner
                </span>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card border-warning my-2 shadow">
              <div class="card-body m-0 p-1">
                <div class="card p-2 shadow-sm my-1 bg-dark text-warning">
                  <div class="row">
                    <div class="col-12 col-lg-6 col-xl-4">
                      <p class="mb-2">PICTURE</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-3">
                      <p class="mb-2">TITLE</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-2">
                      <p class="mb-2">STATUS</p>
                    </div>
                    <div class="col-12 col-lg-6 col-xl-3">
                      <p class="mb-2">ACTIONS</p>
                    </div>
                  </div>
                </div>
                <BannerCard
                v-for="banner in banners"
                :key="banner.id"
                :banner="banner"
                ></BannerCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import BannerCard from '../components/BannerCard.vue'

export default {
  data () {
    return {}
  },
  name: 'BannersPage',
  components: {
    Sidebar,
    Navbar,
    BannerCard
  },
  computed: {
    banners () {
      return this.$store.state.banners
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('fetchBanners')
  }
}
</script>
