<template>
  <b-container>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#fff"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd">
      <Banner
        v-for="banner in banners"
        :key="banner.id"
        :banner="banner"
      ></Banner>
    </b-carousel>
  </b-container>
</template>
<script>
import Banner from './Banner'
export default {
  name: '',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  components: {
    Banner
  },
  computed: {
    banners () {
      return this.$store.state.banners.filter(banner => banner.status === true)
    },
    loopbanners () {
      const arr = [...this.banners]
      arr.shift()
      return arr
    }
  },
  methods: {
    onSlideStart () {
      this.sliding = true
    },
    onSlideEnd () {
      this.sliding = false
    }
  },
  created () {
    this.$store.dispatch('fetchBanners')
  }
}
</script>
<style scoped>

</style>
