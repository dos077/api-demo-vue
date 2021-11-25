<template>
  <section>
    <h2>Option Chain</h2>
    <p>
      <label>symbol</label><input type="text" v-model="symbol" />
      <label>contract type</label>
      <select v-model="contractType">
        <option v-for="option in contractOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <label>strike count</label><input type="text" v-model="strikeCount" />
      <label>include quotes</label
      ><input type="checkbox" v-model="includeQuotes" />
      <label>strategy</label>
      <select v-model="strategy">
        <option v-for="option in strategyOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <label>interval</label><input type="text" v-model="interval" />
      <label>strike</label><input type="text" v-model="strike" />
      <label>range</label>
      <select v-model="range">
        <option v-for="option in rangeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <label>from date</label><input type="date" v-model="fromDate" />
      <label>to date</label><input type="date" v-model="toDate" />
      <label>volatility</label><input type="text" v-model="volatility" />
      <label>underlying price</label>
      <input type="text" v-model="underlyingPrice" />
      <label>interest rate</label><input type="text" v-model="interestRate" />
      <label>days to expiration</label>
      <input type="text" v-model="daysToExpiration" />
      <label>expire month</label><input type="text" v-model="expMonth" />
      <label>option type</label>
      <select v-model="optionType">
        <option
          v-for="option in optionTypeOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <button @click="getChain">get chain</button>
    </p>
    <p v-if="screenStr">
      {{ screenStr }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'OptionChainPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    symbol: null,
    contractOptions: ['ALL', 'CALL', 'PUT'],
    contractType: 'ALL',
    strikeCount: 5,
    includeQuotes: false,
    strategyOptions: [
      'SINGLE',
      'ANALYTICAL',
      'COVERED',
      'VERTICAL',
      'CALENDAR',
      'STRANGLE',
      'STRADDLE',
      'BUTTERFLY',
      'CONDOR',
      'DIAGONAL',
      'COLLAR',
      'ROLL',
    ],
    strategy: 'SINGLE',
    interval: null,
    strike: null,
    rangeOptions: ['ALL', 'ITM', 'NTM', 'OTM', 'SAK', 'SBK', 'SNK'],
    range: 'ALL',
    fromDate: null,
    toDate: null,
    volatility: null,
    underlyingPrice: null,
    interestRate: null,
    daysToExpiration: null,
    expMonth: null,
    optionTypeOptions: ['S', 'NS', 'ALL'],
    optionType: 'ALL',
    screenStr: null,
  }),
  methods: {
    async getChain() {
      const {
        symbol,
        contractType,
        strikeCount,
        includeQuotes,
        strategy,
        interval,
        strike,
        range,
        fromDate,
        toDate,
        volatility,
        underlyingPrice,
        interestRate,
        daysToExpiration,
        expMonth,
        optionType,
      } = this;
      const endPoint = this.isLogIn
        ? this.APIClient.optionChains
        : this.APIClient.optionChains.unauthenticated;
      const resJson = await endPoint.getOptionChain({
        symbol,
        contractType,
        strikeCount,
        includeQuotes,
        strategy,
        interval,
        strike,
        range,
        fromDate: fromDate ? new Date(fromDate) : null,
        toDate: toDate ? new Date(toDate) : null,
        volatility,
        underlyingPrice,
        interestRate,
        daysToExpiration,
        expMonth,
        optionType,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
  },
};
</script>
