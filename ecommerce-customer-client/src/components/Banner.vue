<template>
  <b-carousel-slide :img-src="banner.image_url"       img-width="1024"
    img-max-height="480">
  </b-carousel-slide>
</template>
<script>
export default {
  name: '',
  props: ['banner']
}
</script>
<style scoped>
b-carousel-slide {
  height: 300px !important;
}
</style>
