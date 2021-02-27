<template>
    <div class="p-3 pt-2 mx-auto rounded bg-gradient" id="loginContainer">
      <form id="login-form" @submit.prevent="registerAttemp" action="#" method="post" autocomplete="off">
        <h3 class="text-light">Register</h3>
        <br />
        <div class="mb-3 form-floating">
          <input
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Budi"
            id="nameRegister"
            name="nameRegister"
          />
          <label for="nameRegister" class="col-form-label">Name</label>
        </div>

        <div class="mb-3 form-floating">
          <input
            v-model="email"
            type="text"
            class="form-control"
            placeholder="Budi"
            id="emailRegister"
          />
          <label for="emailRegister" class="col-form-label">Email</label>
        </div>

        <div class="mb-3 form-floating">
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Sabar"
            id="passwordRegister"
            name="passwordRegister"
          />
          <label for="passwordRegister" class="col-form-label"
            >Password</label
          >
        </div>

        <div class="mb-3 p-3">
          <input v-if="isLoading === false"
            type="submit"
            id="submitRegister"
            class="btn btn-outline-light"
            value="Register"
          />
          <div v-if="isLoading === true" class="spinner-border" role="status">
            <span class="visually-hidden text-light">Loading...</span>
          </div>
        </div>
        <div>
          <router-link class="align-self-end text-light" :to="{name:'Login'}"> or login here </router-link>
        </div>
      </form>
    </div>
</template>
<script>
export default {
  name: 'RegisterForm',
  data () {
    return {
      name: '',
      email: '',
      password: ''

    }
  },
  props: ['base_url', 'page'],
  methods: {
    registerAttemp () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log('masuk registerform attemp')
      this.$store.dispatch('postRegister', payload)
      this.name = ''
      this.email = ''
      this.password = ''
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
