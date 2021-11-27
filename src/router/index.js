import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    props: true,
    component: Home,
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => 
      import(/* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails.vue"),
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () =>
          import(/* webpackChunkName: "experienceDetails" */ "../views/ExperienceDetails.vue"),
      }
    ]
  },

];

const router = new VueRouter({
  linkExactActiveClass: "vue-own-active-class", // Estilo propio para la ruta actual
  mode: "history",
  routes,
});

export default router;
