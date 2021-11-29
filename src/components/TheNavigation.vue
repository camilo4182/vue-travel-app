<template>
  <nav id="nav">
    <p class="logo">The Vue Travel App</p>
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">
          Home
        </router-link>
      </li>
      <li 
        class="links"
        v-for="destination in destinations"
        :key="destination.name"
        >
        <router-link :to="{
            name: 'DestinationDetails',
            params: { slug: destination.slug }
          }">
          {{ destination.name }}
        </router-link>
      </li>
      <li class="links">
        <router-link :to="{ name: 'user' }">Dashboard</router-link>
      </li>
      <li class="links">
        <router-link :to="{ name: 'invoices' }">Invoices</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      destinations: store.destinations
    };
  }
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid grey;
  z-index: 1;
}
#nav a {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav a.vue-own-active-class {
  color: #b113d8;
}
.nav-links {
  display: flex;
}
.links {
  padding: 0 20px;
  list-style: none;
}
.links:hover {
  text-decoration: underline;
}
.logo {
  font-size: 20px;
  color: purple;
  font-weight: bold;
}
</style>