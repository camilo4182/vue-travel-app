<template>
  <div>
    <h1>My invoices</h1>
    <button class="btn logout" @click="logOut">Log out</button>
  </div>
</template>

<script>
import store from "@/store";

export default {
  methods: {
    logOut() {
      store.user = null;
      this.$router.push({ name: "Home" });
    }
  }
}
</script>