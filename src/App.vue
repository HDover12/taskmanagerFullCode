<template>
  <v-app>
    <v-app-bar title="Task Manager"></v-app-bar>
    <v-navigation-drawer rail expand-on-hover rail-width="60">
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi:mdi-folder"
          title="Tasks"
          value="myfiles"
          to="/"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-calendar-text"
          title="Calendar"
          value="shared"
          to="/calendar"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-overlay
      v-model="overlay"
      class="align-center justify-center"
      transition="scale-transition"
      ><WelcomeComponent @click="overlaymethod()" />
    </v-overlay>

    <v-main id="main">
      <!-- <WeatherComponent /> -->
      <router-view></router-view>
      <!-- <CalendarComponent /> -->
    </v-main>
  </v-app>
</template>

<script>
import WelcomeComponent from "./components/Welcome/WelcomeComponent.vue";

// import CalendarComponent from "./components/Calendar/CalendarComponent.vue";

// import TaskAreaComponent from "./components/TaskArea/TaskAreaComponent.vue";

// import WeatherComponent from "./components/WeatherComponent.vue";

export default {
  name: "App",
  data() {
    return {
      overlay: true,
    };
  },
  components: {
    WelcomeComponent,
  },
  beforeMount() {
    this.$store.dispatch("getTaskList");
  },
  methods: {
    overlaymethod() {
      this.overlay = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}

#main {
  padding-top: 20px;
  padding-right: 20px;
}

.is-today > .flex > #wrapper > #dateNumber {
  border: 1px solid gray;
  background-color: rgba(128, 128, 128, 0.3);
}

.v-overlay__scrim {
  opacity: 0.8 !important;
  background: black !important;
}
</style>
