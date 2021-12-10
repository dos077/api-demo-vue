<template>
  <section v-if="isLogIn">
    <h2>Account Info</h2>
    <p>
      <label>Get Accounts</label>
      <label>fields</label>
      <select v-model="fields" multiple size="2">
        <option v-for="option in fieldsOptions" :key="option">
          {{ option }}
        </option>
      </select>
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
    fields: null,
    fieldsOptions: ['orders', 'positions'],
  }),
  methods: {
    async getAcc() {
      const { fields } = this;
      const acc = await this.APIClient.accounts.getAccount({ fields });
      console.log(acc);
      this.screenStr = JSON.stringify(acc);
    },
    async getAccs() {
      const { fields } = this;
      const accs = await this.APIClient.accounts.getAccounts({ fields });
      console.log(accs);
      this.screenStr = JSON.stringify(accs);
    },
  },
};
</script>
