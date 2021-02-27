<template>
    <div class="p-3 mt-5 pt-5 mx-auto rounded bg-gradient" id="loginContainer">
      <form id="login-form" @submit.prevent="loginAttemp" action="#" method="post" autocomplete="off">
        <h3 class="text-light">Dashboard Login</h3>
        <br />
        <div class="mb-3 form-floating">
          <input
            v-model="loginEmail"
            type="text"
            class="form-control"
            placeholder="Budi"
            id="emailLogin"
            name="emailLogin"
          />
          <label for="emailLogin" class="col-form-label">Email</label>
        </div>

        <div class="mb-3 form-floating">
          <input
            type="password"
            v-model="loginPassword"
            class="form-control"
            placeholder="Sabar"
            id="passwordLogin"
            name="passwordLogin"
          />
          <label for="passwordLogin" class="col-form-label"
            >Password</label
          >
        </div>

        <div class="mb-3 p-3">
          <input v-if="!isLoading"
            type="submit"
            id="submitLogin"
            class="btn btn-primary btn-lg "
            value="Login"
          />
          <div v-if="isLoading" class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </form>
    </div>
</template>
<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      loginEmail: '',
      loginPassword: ''

    }
  },
  props: ['base_url', 'page'],
  methods: {
    loginAttemp () {
      const payload = {
        email: this.loginEmail,
        password: this.loginPassword
      }
      console.log('masuk loginform submit')
      this.$store.dispatch('postLogin', payload)
      this.loginEmail = ''
      this.loginPassword = ''
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}

</script>
<style scoped>
  #loginContainer {
    max-width: 400px;
    text-align: center;

  }
</style>
