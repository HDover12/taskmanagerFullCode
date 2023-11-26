import App from "./App.vue";
import { createApp } from "vue";
import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import store from "./store";
import { createRouter, createWebHistory } from "vue-router";

import CalendarComponent from "./components/Calendar/CalendarComponent.vue";
import TaskAreaComponent from "./components/TaskArea/TaskAreaComponent.vue";
import NewTask from "./components/TaskArea/NewTask.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/calendar",
      component: CalendarComponent,
    },
    {
      path: "/new",
      component: NewTask,
    },
    {
      path: "/",
      component: TaskAreaComponent,
    },
  ],
});

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);
app.use(VCalendar, {});

app.mount("#app");
