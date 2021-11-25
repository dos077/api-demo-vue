<template>
  <div>
    <config-panel v-if="!APIClient" @build-client="loadClient" />
    <div v-if="APIClient">
      <auth-panel :isLogIn="isLogIn" :APIClient="APIClient" />
      <select v-model="tabsSelected" multiple size="5">
        <option
          v-for="option in isLogIn
            ? [...tabOptions, ...authedTabOtionis]
            : tabOptions"
          :key="option"
        >
          {{ option }}
        </option>
      </select>
      <instruments-panel
        v-if="tabsSelected.includes('instruments')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
      <movers-panel
        v-if="tabsSelected.includes('movers')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
      <option-chain-panel
        v-if="tabsSelected.includes('options')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
      <price-history-panel
        v-if="tabsSelected.includes('priceHistory')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
      <quotes-panel
        v-if="tabsSelected.includes('quotes')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
      <acc-panel
        v-if="tabsSelected.includes('account')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
      <orders-panel
        v-if="tabsSelected.includes('orders')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
      <transaction-panel
        v-if="tabsSelected.includes('transactions')"
        :isLogIn="isLogIn"
        :APIClient="APIClient"
      />
    </div>
  </div>
</template>

<script>
import ConfigPanel from '../components/ConfigPanel.vue';
import AuthPanel from '../components/AuthPanel.vue';
import InstrumentsPanel from '../components/InstrumentsPanel.vue';
import MoversPanel from '../components/MoversPanel.vue';
import OptionChainPanel from '../components/OptionChainPanel.vue';
import PriceHistoryPanel from '../components/PriceHistoryPanel.vue';
import QuotesPanel from '../components/QuotesPanel.vue';
import AccPanel from '../components/AccPanel.vue';
import OrdersPanel from '../components/OrdersPanel.vue';
import TransactionPanel from '../components/TransactionPanel.vue';

import TDAPI from '@i077/tda-api-nodejs-unofficial';

export default {
  name: 'Home',
  components: {
    ConfigPanel,
    AuthPanel,
    InstrumentsPanel,
    MoversPanel,
    OptionChainPanel,
    PriceHistoryPanel,
    QuotesPanel,
    AccPanel,
    OrdersPanel,
    TransactionPanel,
  },
  data: () => ({
    APIClient: null,
    isLogIn: false,
    tabOptions: ['instruments', 'movers', 'options', 'priceHistory', 'quotes'],
    authedTabOtionis: ['account', 'orders', 'transactions'],
    tabsSelected: [],
  }),
  methods: {
    afterLogIn() {
      this.isLogIn = true;
    },
    afterLogOut() {
      this.isLogIn = false;
    },
    loadClient(config) {
      const { afterLogIn, afterLogOut } = this;
      this.APIClient = TDAPI({ ...config, afterLogIn, afterLogOut });
    },
  },
};
</script>

<style>
section {
  max-width: 50rem;
  margin: 0 auto 1.5rem;
  border: 1px solid #666;
  padding: 0.5rem 0.75rem 0.75rem;
}
input {
  display: block;
  float: left;
  margin: 0 0.5rem 1rem 0;
}
select {
  display: block;
  float: left;
  margin: 0 0.5rem 1rem 0;
}
label {
  display: block;
  margin: 0 0.5rem 1rem 0;
  float: left;
  clear: left;
}
button {
  display: block;
  clear: both;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
}
p {
  word-break: break-all;
}
</style>
