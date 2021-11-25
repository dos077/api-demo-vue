<template>
  <section v-if="isLogIn">
    <h2>Orders</h2>
    <p>
      <label>Place Equity Order(Placing Actual Order in Your Account!)</label>
      <label>Account Id</label><input type="text" v-model="accountId" />
      <label>Quantity</label><input type="text" v-model="quantity" />
      <label>symbol</label><input type="text" v-model="symbol" />
      <label>Order Type</label><input type="text" v-model="orderType" />
      <label>price</label>
      <input type="text" v-model="price" placeholder="for limit order" />
      <label>instruction</label>
      <input type="text" v-model="instruction" placeholder="BUY or SELL" />
      <button value="place order" @click="placeEquity">placec order</button>
    </p>
    <p>
      <label>Cancel Order</label>
      <label>Account Id</label><input type="text" v-model="accountId" />
      <label>Order Id</label><input type="text" v-model="orderId" />
      <button value="cancel order" @click="cancelOrder">cancel order</button>
    </p>
    <p>
      <label>Get Orders</label>
      <label>Account Id</label><input type="text" v-model="accountId" />
      <label>From Date</label><input type="date" v-model="fromEnteredTime" />
      <label>To Date</label><input type="date" v-model="toEnteredTime" />
      <button value="Get Orders" @click="getOrders">get orders</button>
    </p>
    <p>{{ screenStr }}</p>
  </section>
</template>

<script>
export default {
  name: 'OrdersPanel',
  props: ['APIClient', 'isLogIn'],
  data: () => ({
    accountId: null,
    quantity: 0,
    symbol: '',
    orderType: 'MARKET',
    price: null,
    instruction: null,
    orderId: null,
    fromEnteredTime: null,
    toEnteredTime: null,
    screenStr: null,
  }),
  methods: {
    placeEquity() {
      const { accountId, quantity, symbol, orderType, price, instruction } =
        this;
      this.APIClient.orders.placeOrderEquity({
        accountId,
        quantity,
        symbol,
        orderType,
        price,
        instruction,
      });
    },
    cancelOrder() {
      const { accountId, orderId } = this;
      this.APIClient.orders.cancelOrder({ accountId, orderId });
    },
    async getOrder() {
      const { accountId, orderId } = this;
      const resJson = await this.APIClient.orders.getOrder({
        accountId,
        orderId,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
    async getOrders() {
      const { accountId, fromEnteredTime, toEnteredTime } = this;
      const resJson = await this.APIClient.orders.getOrdersByPath({
        accountId,
        fromEnteredTime: fromEnteredTime
          ? new Date(fromEnteredTime)
          : undefined,
        toEnteredTime: toEnteredTime ? new Date(toEnteredTime) : null,
      });
      console.log(resJson);
      this.screenStr = JSON.stringify(resJson);
    },
  },
};
</script>
