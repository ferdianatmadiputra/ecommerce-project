<template>
  <div class="justify-content-center bg-primary">
    <lottie-player class="mx-auto" src="https://assets1.lottiefiles.com/packages/lf20_7fy2yzzs.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
    <LoginForm></LoginForm>
  </div>
</template>
<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

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
  min-height: 100%
}
</style>
