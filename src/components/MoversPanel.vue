<template>
  <section>
    <h2>Movers</h2>
    <p>
      <label>Show Movers</label>
      <label>index</label>
      <input type="text" v-model="index" placeholder="ie. $COMPX, $DJI" />
      <label>direction</label>
      <select v-model="direction">
        <option
          v-for="option in directionOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <label>change</label>
      <select v-model="change">
        <option v-for="option in changeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <button @click="getMovers">get movers</button>
    </p>
    <p>
      {{ screenStr }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'MoversPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    index: null,
    directionOptions: ['up', 'down'],
    direction: 'up',
    changeOptions: ['value', 'percent'],
    change: 'value',
    screenStr: null,
  }),
  methods: {
    async getMovers() {
      const { index, direction, change } = this;
      const endPoint = this.isLogIn
        ? this.APIClient.movers
        : this.APIClient.movers.unauthenticated;
      const resJson = await endPoint.getMovers({
        index,
        direction,
        change,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
  },
};
</script>
