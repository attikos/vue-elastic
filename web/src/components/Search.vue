<template>
  <div class="container">
    <section class="search">
      <b-input placeholder="Search" @keyup.native.enter="listCustomers" v-model="query"></b-input>
      <b-select @input="changeSort" v-model="sortBy" placeholder="Sort by">
        <option v-for="option in sortParams" :value="option" :key="option">{{ option }}</option>
      </b-select>
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
      sortParams: ["Default", "Registered Low-High", "Registered High-Low"],
      customers: [],
      sortBy: "Default"
    };
  },
  components: {
    CustomerTile,
    InfiniteLoading
  },
  methods: {
    async infiniteHandler($state) {
      const response = await this.getCustomers();
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
    },
    async listCustomers() {
      this.page = 0;
      const response = await this.getCustomers();
      this.total = response.data.total ? response.data.total.value : 0;
      this.customers = response.data.hits;
      this.page = 1;
    },
    getCustomers() {
      return axios.get(
        `${api}/customers?page=${this.page}&query=${this.query}&sort=${this.sortBy}`
      );
    },
    changeSort() {
      this.listCustomers();
    }
  },
  beforeMount() {
    this.listCustomers();
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
