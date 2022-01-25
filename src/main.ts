import "normalize.css";

import * as VueRouter from "vue-router";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner);

import { createApp } from "vue";
import Root from "./Root.vue";

const IndexPage = () => import("./components/IndexPage.vue");
const DuckPage = () => import("./components/DuckPage.vue");

const routes = [
  { path: "/", component: IndexPage },
  { name: "duck", path: "/duck/:id", component: DuckPage, props: true }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

const app = createApp(Root);

app.use(router);
app.use(createPinia());
app.use(MotionPlugin);

app.mount("#root");
