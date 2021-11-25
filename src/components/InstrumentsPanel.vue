<template>
  <section>
    <h2>Instruments</h2>
    <p>
      <label>Search Instruments</label>
      <label>symbol</label><input type="text" v-model="symbol" />
      <label>projection</label><input type="text" v-model="projection" />
      <button @click="searchInstruments">search</button>
    </p>
    <p>
      {{ screenStr }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'InstrumentsPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    cusip: null,
    symbol: null,
    projection: 'fundamental',
    screenStr: null,
  }),
  methods: {
    async searchInstruments() {
      const { symbol, projection } = this;
      const endPoint = this.isLogIn
        ? this.APIClient.instruments
        : this.APIClient.instruments.unauthenticated;
      const resJson = await endPoint.searchInstruments({
        symbol,
        projection,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
  },
};
</script>
