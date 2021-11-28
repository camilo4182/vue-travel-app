<template>
  <span class="go-back">
    <button @click="goBack">Go back</button>
  </span>
</template>

<script>
export default {
  methods: {
    goBack() {
      //this.$router.go(-1);
      this.$router.push({ name: "Home" });
    }
  }
}
</script>

<style scoped>
.go-back {
  /* display: flex; */
  width: 50%;
  text-align: left;
}
button {
  cursor: pointer;
  border: 1px solid black;
  background-color: lightseagreen;
  font-weight: bold;
  color: white;
  padding: 10px 10px;
}
</style>