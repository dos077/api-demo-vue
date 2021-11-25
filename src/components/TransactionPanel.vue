<template>
  <section v-if="isLogIn">
    <h2>Transaction History</h2>
    <p>
      <label>get transaction</label>
      <label>account ID</label><input type="text" v-model="accountId" />
      <label>transaction ID</label><input type="text" v-model="transactionId" />
      <button value="search" @click="getTransaction">search</button>
    </p>
    <p>
      <label>get transactions</label>
      <label>account ID</label><input type="text" v-model="accountId" />
      <label>type</label>
      <select v-model="type">
        <option v-for="option in typeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <label>symbol</label><input type="text" v-model="symbol" />
      <label>start date</label><input type="date" v-model="startDate" />
      <label>end date</label><input type="date" v-model="endDate" />
      <button value="search" @click="getTransactions">search</button>
    </p>
    <p>{{ screenStr }}</p>
  </section>
</template>

<script>
export default {
  name: 'TransactionPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    accountId: null,
    transactionId: null,
    typeOptions: [
      'ALL',
      'TRADE',
      'BUY_ONLY',
      'SELL_ONLY',
      'CASH_IN_OR_CASH_OUT',
      'CHECKING',
      'DIVIDEND',
      'INTEREST',
      'OTHER',
      'ADVISOR_FEES',
    ],
    type: 'ALL',
    symbol: null,
    startDate: null,
    endDate: null,
    screenStr: null,
  }),
  methods: {
    async getTransaction() {
      const { accountId, transactionId } = this;
      const resJson = await this.APIClient.transactionHistory.getTransaction({
        accountId,
        transactionId,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
    async getTransactions() {
      const { type, symbol, startDate, endDate, accountId } = this;
      const resJson = await this.APIClient.transactionHistory.getTransactions({
        type,
        symbol,
        accountId,
        endDate: endDate ? new Date(endDate) : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
  },
};
</script>
