<template>
  <div class="card p-2 shadow-sm my-1">
    <div class="row align-items-center">
      <div class="col-12 col-lg-6 col-xl-4 align-items-center">
        <img class="mx-auto" :src="banner.image_url" width="300px" height="100px"
        style="object-fit: cover;">
      </div>
      <div class="col-12 col-lg-6 col-xl-3">
        <p class="mb-2 mx-auto">{{ banner.title }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-2">
        <p class="mb-2">{{ stringifyStatus(banner.status) }}</p>
      </div>
      <div class="col-12 col-lg-6 col-xl-3">
          <a class="btn btn-outline-secondary p-1 m-1 display-5"
          @click.prevent="getEditBanner">
            <i class="far fa-edit"></i>
            Edit
          </a>
          <a class="btn btn-outline-secondary p-1 display-5"
          @click.prevent="delBanner">
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
  name: 'BannerCard',
  props: [
    'banner'
  ],
  methods: {
    stringifyStatus (val) {
      if (val === true) {
        return 'Active'
      } else {
        return 'Hidden'
      }
    },
    getEditBanner () {
      this.$router.push(`/banner/${this.banner.id}`)
    },
    delBanner () {
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
          this.$store.dispatch('deleteBanner', { id: this.banner.id })
        }
      })
    }
  }
}
</script>
