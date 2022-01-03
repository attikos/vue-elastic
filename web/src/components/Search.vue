<template>
  <div class="container">
    <section class="search">
      <b-input placeholder="Search" @keyup.native.enter="search" v-model="query"></b-input>
    </section>
    <div class="customer-count">{{ `${total} customers` }}</div>
    <div class="customers-list">
      <customer-tile v-for="customer in customers" :key="customer._id" :customer="customer" />
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import CustomerTile from "./CustomerTile";
import { api } from "../utils.ts";
import axios from "axios";
import "buefy/dist/buefy.css";
export default {
  name: "Search",
  data() {
    return {
      query: "",
      page: 0,
      total: 0,
      customers: []
    };
  },
  components: {
    CustomerTile,
    InfiniteLoading
  },
  methods: {
    infiniteHandler($state) {
      axios
        .get(`${api}/customers?p=${this.page}&q=${this.query}`)
        .then(response => {
          this.total = response.data.total ? response.data.total.value : 0;
          const customers = response.data.hits;
          if (customers.length) {
            this.page += 1;
            this.customers.push(...customers);
            if ($state) {
              $state.loaded();
            }
          } else {
            $state.complete();
          }
        });
    },
    search() {
      axios.get(`${api}/search?q=${this.query}`).then(response => {
        this.customers = response.data.hits;
        this.total = response.data.total ? response.data.total.value : 0;
      });
    }
  },
  beforeMount() {
    this.infiniteHandler();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search {
  display: flex;
}
.customers-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
}
.customer-count {
  width: 100%;
  padding-left: 20px;
  text-align: start;
}
.autocomplete {
  width: 300px;
}
</style>
