<template>
  <section v-if="isLogIn">
    <h2>Account Info</h2>
    <p>
      <label>Get Accounts</label>
      <button value="get" @click="getAccs">get</button>
    </p>
    <p>{{ screenStr }}</p>
  </section>
</template>

<script>
export default {
  name: 'AccPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    screenStr: null,
  }),
  methods: {
    async getAcc() {
      const acc = await this.APIClient.accounts.getAccount();
      console.log(acc);
      this.screenStr = JSON.stringify(acc);
    },
    async getAccs() {
      const accs = await this.APIClient.accounts.getAccounts();
      console.log(accs);
      this.screenStr = JSON.stringify(accs);
    },
  },
};
</script>
