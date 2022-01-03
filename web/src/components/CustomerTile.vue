<template>
  <div class="customer">
    <div class="name">{{customer._source.name}}</div>

    <div class="image">
      <img
        :src="customer._source.img"
        :alt="customer._source.name"
      />
    </div>

    <div>{{customer._source.registered_at}}</div>
  </div>
</template>

<script>
export default {
  name: "CustomersTile",
  props: {
    customer: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.customer {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 31%;
  min-width: 200px;
  padding: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.name {
  overflow: hidden;
  max-height: 54px;
}
.image img {
  display: initial;
  width: auto;
  height: 180px;
}
</style>
