<template>
  <div>
    <section class="destination">
      <div class="title">
        <GoBackButton />
        <h1>
          {{ destination.name }}
        </h1>
      </div>
      <div class="destination-details">
        <img
          :src="require(`@/assets/${destination.image}`)"
          :alt="destination.name"
        />
        <p>{{ destination.description }}</p>
      </div>
    </section>
    <section class="experiences" id="experience">
      <h2>Top experiences in {{ destination.name }}</h2>
      <div class="cards">
        <div
          class="card"
          v-for="experience in destination.experiences"
          :key="experience.slug"
        >
          <router-link :to="{
              name: 'experienceDetails',
              params: { experienceSlug: experience.slug},
              hash: '#experience'
            }"
          >
            <img
              :src="require(`@/assets/${experience.image}`)"
              :alt="experience.name"
            />
            <span class="card_text">
              {{ experience.name }}
            </span>
          </router-link>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </section>
  </div>
</template>

<script>
import store from "@/store";
import GoBackButton from "@/components/GoBackButton";

export default {
  components: {
    GoBackButton
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    destination() {
      return store.destinations.find(
        (destination) => destination.slug == this.slug // o destination.slug === Number(id) if it was an int
      );
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  margin-bottom: 20px;
}
h1 {
  margin-top: 0px;
  margin-bottom: 0px;
}
img {
  max-width: 600px;
  height: auto;
  width: 100%;
  max-height: 400px;
}
p {
  margin: 0 40px;
  font-size: 20px;
  text-align: left;
}
.experiences {
  padding: 40px 0;
}
.destination-details {
  display: flex;
  justify-content: space-between;
}
.cards {
  display: flex;
}
.cards img {
  max-height: 200px;
}
.card {
  flex: 1;
  padding: 0 20px;
  position: relative;
}
.card_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 0 0 15px #000;
  text-decoration: none;
}

/* --------- Transitions --------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
