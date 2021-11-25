<template>
  <section>
    <h2>Price History</h2>
    <p>
      <label>symbol</label><input type="text" v-model="symbol" />
      <label>period type</label>
      <select v-model="periodType">
        <option v-for="option in periodOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <label>period</label><input type="text" v-model="period" />
      <label>frequency type</label>
      <select v-model="frequencyType">
        <option
          v-for="option in frequencyOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <label>frequency</label><input type="text" v-model="frequency" />
      <label>end date</label><input type="date" v-model="endDate" />
      <label>start date</label><input type="date" v-model="startDate" />
      <label>extended hours</label>
      <input type="checkbox" v-model="needExtendedHoursData" />
      <button @click="getHistory">get history</button>
      {{ screenStr }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'PriceHistoryPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    symbol: null,
    periodOptions: ['day', 'month', 'year', 'ytd'],
    periodType: 'day',
    period: 1,
    frequencyOptions: ['minute', 'daily', 'weekly', 'monthly'],
    frequencyType: 'minute',
    frequency: 1,
    endDate: null,
    startDate: null,
    needExtendedHoursData: false,
    screenStr: null,
  }),
  methods: {
    async getHistory() {
      const {
        symbol,
        periodType,
        period,
        frequencyType,
        frequency,
        endDate,
        startDate,
        needExtendedHoursData,
      } = this;
      const endPoint = this.isLogIn
        ? this.APIClient.priceHistory
        : this.APIClient.priceHistory.unauthenticated;
      const resJson = await endPoint.getPriceHistory({
        symbol,
        periodType,
        period,
        frequencyType,
        frequency,
        endDate: endDate ? new Date(endDate) : null,
        startDate: startDate ? new Date(startDate) : null,
        needExtendedHoursData,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
  },
};
</script>
