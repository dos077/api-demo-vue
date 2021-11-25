<template>
  <section>
    <h2>Quotes</h2>
    <p>
      <label>single quote</label>
      <label>symbol</label><input type="text" v-model="symbol" />
      <button @click="getQuote">get quote</button>
    </p>
    <p>
      <label>multiple quotes</label>
      <label>symbols</label>
      <input type="text" v-model="symbols" placeholder="separated by space" />
      <button @click="getQuotes">get quotes</button>
    </p>
    <p>
      {{ screenStr }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'QuotesPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    symbol: null,
    symbols: null,
    projection: 'fundamental',
    screenStr: null,
  }),
  methods: {
    async getQuote() {
      const { symbol } = this;
      const resJson = this.isLogIn
        ? await this.APIClient.quotes.getQuote({ symbol })
        : await this.APIClient.quotes.unauthenticated.getQuote({ symbol });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
    async getQuotes() {
      const symbols = this.symbols.split(' ');
      const resJson = this.isLogIn
        ? await this.APIClient.quotes.getQuotes({ symbols })
        : await this.APIClient.quotes.unauthenticated.getQuotes({ symbols });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
  },
};
</script>
