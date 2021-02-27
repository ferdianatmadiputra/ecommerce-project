<template>
    <div class="row">
      <Navbar></Navbar>
      <Sidebar></Sidebar>
            <main class="col-md-9 ms-sm-auto col-lg-11 px-md-4">
        <div class="container">
          <div class="p-1 my-3" id="kanban-title">
            <h1 style="text-align:center">
              &nbsp;Edit Banner
            </h1>
          </div>
          <!--toolbar-->
          <div class="row align-items-center justify-content-end p-2" id="addproduct">
            <div class="p-3 mx-auto rounded bg-gradient" style="max-width: 400px; text-align:center">
              <form id="login-form" v-on:submit.prevent="submitEditBanner" action="#" method="post">
                <div class="mb-3 form-floating">
                  <input
                    v-model="title"
                    type="text"
                    class="form-control"
                    placeholder="aaa"
                    id="bannerName"
                  />
                  <label for="bannerName" class="col-form-label">Banner Title</label>
                </div>

                <div class="mb-3 form-floating">
                  <input
                    v-model="image_url"
                    type="text"
                    class="form-control"
                    placeholder="aaa"
                    id="bannerImg"
                  />
                  <label for="bannerImg" class="col-form-label">Image URL</label>
                </div>

                <div class="mb-3 form-floating">
                  <select v-model="status" name="bannerStatus" id="bannerStatus" class="form-control">
                    <option selected disabled value="">Choose Status</option>
                    <option value="true">Active</option>
                    <option value="false">Hidden</option>
                  </select>
                  <label for="bannerStatus" class="col-form-label">Status</label>
                </div>

                <div class="mb-3">
                  <input
                    v-if="!isLoading"
                    type="submit"
                    id="submitNewBanner"
                    class="btn btn-primary"
                    value="Update Banner"
                  />
                  <div v-if="isLoading === true" class="spinner-border text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <router-link :to="{name: 'BannersPage'}" class="btn btn-outline-secondary">
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
  name: 'EditBannerPage',
  components: {
    Navbar, Sidebar
  },
  data () {
    return {
      title: '',
      image_url: '',
      status: ''
    }
  },
  methods: {
    submitEditBanner () {
      this.$store.dispatch('editBanner', {
        id: this.$route.params.banner_id,
        title: this.title,
        image_url: this.image_url,
        status: this.status
      })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    const bannerToEdit = this.$store.state.banners.find(el => +el.id === +this.$route.params.banner_id)
    this.title = bannerToEdit.title
    this.image_url = bannerToEdit.image_url
    this.status = bannerToEdit.status
  }
}
</script>
<style scoped>
</style>
