import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

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
      import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails.vue"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "experienceDetails" */ "../views/ExperienceDetails.vue"
          ),
        beforeEnter: (to, from, next) => {
          const destination = store.destinations.find(
            (destination) => destination.slug === to.params.slug
          );
          if (destination) {
            const exp = destination.experiences.find(
              (expierence) => expierence.slug === to.params.experienceSlug
            );
            if (exp) {
              next();
            } else {
              next({ name: "NotFound" });
            }
          } else {
            next({ name: "NotFound" });
          }
        },
      },
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        (destination) => destination.slug === to.params.slug
      );
      if (exists) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  linkExactActiveClass: "vue-own-active-class", // Estilo propio para la ruta actual
  mode: "history",
  /* scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 0 }
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  }, */
  scrollBehavior(to, from, savedPosition) {
    let position = {};
    if (savedPosition) {
      position = savedPosition;
    } else if (to.hash) {
      if (document.querySelector(to.hash)) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 10 };
        }
      }
    } else position = { x: 0, y: 0 };
    return position;
  },
  /* scrollBehavior(to, from, savedPosition) {
    let position = {};
    if (savedPosition) {
      position = savedPosition;
    } else if (to.hash) {
      if (document.querySelector(to.hash)) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 0 };
        }
      }
    } else position = { x: 0, y: 0 };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(position);
      }, 330);
    });
  }, */
  routes,
});

export default router;
