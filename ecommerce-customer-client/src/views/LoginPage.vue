<template>
  <div class="justify-content-center bg-primary">
    <lottie-player class="mx-auto" src="https://assets4.lottiefiles.com/packages/lf20_1BzO5d.json"  background="rgba(0, 0, 0, 0)"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
    <LoginForm></LoginForm>
  </div>
</template>
<script>
// @ is an alias to /src
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'LoginPage',
  data () {
    return {}
  },
  components: {
    LoginForm
  }
}
</script>
<style scoped>
div {
  height: 100vh
}
</style>
