<template>
  <section>
    <h2>{{ isLogIn ? 'Logged In' : 'Login for More Features' }}</h2>
    <p v-if="!isLogIn">
      If logInRedirect is set to true, click login to be redirected to TD
      Ameritrade OAuth portal.
    </p>
    <button v-if="!isLogIn" @click="logIn">login</button>
    <button v-if="isLogIn" @click="logOut">logout</button>
  </section>
</template>

<script>
export default {
  name: 'AuthPanel',
  props: ['APIClient', 'isLogIn'],
  methods: {
    logIn() {
      const { query } = this.$route;
      const code = query ? query.code : null;
      this.APIClient.authentication.logIn(code);
      if (code) this.$router.replace({ query: null });
    },
    logOut() {
      this.APIClient.authentication.logOut();
    },
  },
  mounted() {
    if (this.$route.query && this.$route.query.code) this.logIn();
  },
};
</script>
