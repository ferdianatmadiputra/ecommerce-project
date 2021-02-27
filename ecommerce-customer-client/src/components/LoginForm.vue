<template>
    <div class="p-3 pt-2 mx-auto rounded bg-gradient" id="loginContainer">
      <form id="login-form" @submit.prevent="loginAttemp" action="#" method="post" autocomplete="off">
        <h3 class="text-light">Login</h3>
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
          <input
            v-if="isLoading === false"
            type="submit"
            id="submitLogin"
            class="btn btn-outline-light"
            value="Login"
          />
          <div v-if="isLoading === true" class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div>
          <router-link class="align-self-end text-light" :to="{name:'Register'}"> or register here </router-link>
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
    max-height: 400px;
    text-align: center;

  }
</style>
