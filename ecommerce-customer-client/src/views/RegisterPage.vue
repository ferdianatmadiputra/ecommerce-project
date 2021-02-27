<template>
  <div class="justify-content-center bg-primary">
    <lottie-player class="mx-auto" src="https://assets6.lottiefiles.com/packages/lf20_KAeP3q.json"  background="transparent"  speed="1"  style="width: 200px; height: 200px;"  loop  autoplay></lottie-player>
    <RegisterForm></RegisterForm>
  </div>
</template>
<script>
// @ is an alias to /src
import RegisterForm from '../components/RegisterForm.vue'

export default {
  name: 'LoginPage',
  data () {
    return {}
  },
  components: {
    RegisterForm
  }
}
</script>
<style scoped>
div {
  height: 100vh
}
</style>
