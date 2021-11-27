<template>
  <section>
    <h2>Setup API Client</h2>
    <label>API Key:</label>
    <input type="text" v-model="clientId" placeholder="apiky@AMER.OAUTHAP" />
    <label>Redirect URI:</label>
    <input type="text" v-model="redirectUri" />
    <label>Local Store Token</label>
    <input type="checkbox" v-model="storeAuth" />
    <label>Redirect for Login</label>
    <input type="checkbox" v-model="logInRedirect" />
    <button @click="buildClient" value="initialize client">
      initialize client
    </button>
  </section>
</template>

<script>
export default {
  name: 'ConfigPanel',
  data: () => ({
    clientId: '@AMER.OAUTHAP',
    redirectUri: 'https://dos077.github.io/api-demo-vue/',
    storeAuth: false,
    logInRedirect: true,
  }),
  methods: {
    buildClient() {
      const { clientId, redirectUri, storeAuth, logInRedirect } = this;
      this.$emit('buildClient', {
        clientId,
        redirectUri,
        storeAuth,
        logInRedirect,
      });
    },
  },
};
</script>
