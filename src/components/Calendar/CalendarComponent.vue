<template>
  <v-container class="text-center">
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
      is-dark
      color="blue"
      trim-weeks
    >
      <template v-slot:day-content="{ day, attributes }">
        <DayComponent
          :forecastArray="forecastArray"
          :day="day"
          :attr="attributes"
          :taskList="taskList"
          :location="location"
        />
      </template>
    </v-calendar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import DayComponent from "./DayComponent.vue";

export default {
  data() {
    return {
      masks: {
        weekdays: "WWW",
      },
      forecastArray: [],
      today: new Date(),
      attributes: [],
      location: "",
      testthing: 0,
    };
  },
  components: { DayComponent },
  computed: {
    ...mapGetters(["tasks"]),
    taskList() {
      this.tasks.forEach((el) => {
        var newTask = {
          key: el.title,
          customData: {
            title: el.title,
            class: "text-white",
            building: el.building,
            gases: el.gases,
            id: el.id,
            projectCoordinator: el.projectCoordinator,
            testType: el.testType,
          },
          dates: el.date,
        };
        this.attributes.push(newTask);
      });

      return this.attributes;
    },
  },

  methods: {
    ...mapActions(["getTaskList"]),
  },

  mounted() {
    fetch("https://api.weather.gov/points/36.5484,-82.5618")
      .then((r) => r.json())
      .then((data) => {
        this.location = data.properties.relativeLocation.properties.city;
      });

    fetch("https://api.weather.gov/gridpoints/MRX/117,82/forecast")
      .then((r) => r.json())
      .then((data) => {
        this.forecastArray = data;
      });
  },
};
</script>

<style scoped>
.vc-day {
  border: 1px solid gray;
  height: 117px;
}
.v-container {
  height: 97px;
  width: 1200px;
}
#dateNumber {
  text-align: right;
}

.v-col {
  padding: 0;
}

.is-today {
  border: 2px solid gray;
  background-color: rgba(128, 128, 128, 0.3);
  padding: 0 47%;
}

.vc-container {
  width: 100%;
}

.day-label {
  flex-grow: 4;
}

img {
  width: 20px;
}

.is-today > #contentArea {
  width: 100%;
  color: red;
}
</style>
