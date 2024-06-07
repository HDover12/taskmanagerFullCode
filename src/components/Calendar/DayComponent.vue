<template>
  <div class="flex flex-col h-full z-10 overflow-hidden">
    <v-container id="wrapper">
      <v-row justify="space-between" id="dateNumber">
        <v-col>
          <span class="day-label text-sm text-gray-900">{{ day.day }} </span>
        </v-col>
        <v-col @click="weather">
          <v-chip
            :prepend-icon="icon"
            variant="plain"
            class="weatherIcon"
          ></v-chip>
        </v-col>
      </v-row>
      <v-row id="contentArea">
        <div class="flex-grow overflow-y-auto overflow-x-auto">
          <p
            @click="infoOverlay = !infoOverlay"
            v-for="attri in attr"
            :key="attri.id"
            class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
            :class="attri.customData.class"
          >
            <v-icon icon="mdi-checkbox-blank-circle"></v-icon>
            {{ attri.customData.title }}
            <v-overlay
              v-model="infoOverlay"
              class="align-center justify-center"
              scrim="rgba(0, 0, 0, 0.9)"
              transition="scale-transition"
            >
              <DayDetailsComponent
                :title="attri.customData.title"
                :building="attri.customData.building"
                :date="attri.customData.date"
                :id="attri.customData.data"
                :projectCoordinator="attri.customData.projectCoordinator"
                :testType="attri.customData.testType"
                :gases="attri.customData.gases"
              />
            </v-overlay>
          </p>
        </div>
      </v-row>
    </v-container>
  </div>

  <v-overlay
    v-model="weatherOverlay"
    class="align-center justify-center"
    scrim="rgba(0, 0, 0, 0.9)"
    transition="scale-transition"
  >
    <WeatherComponent
      :forecast="forecast"
      :location="location"
      :temp="temp"
      :day="day"
      :forecastimg="forecastimg"
      :detailedForecast="detailedForecast"
    />
  </v-overlay>
</template>

<script>
import WeatherComponent from "../WeatherComponent.vue";
import DayDetailsComponent from "./DayDetailsComponent.vue";
export default {
  props: ["attr", "day", "forecastArray", "location"],
  components: {
    WeatherComponent,

    DayDetailsComponent,
  },
  data() {
    return {
      weatherOverlay: false,
      infoOverlay: false,
      forecast: "",
      forecastimg: "",
      temp: "",
      detailedForecast: "",
    };
  },

  methods: {
    weather() {
      this.weatherOverlay = true;

      if (this.weatherOverlay) {
        const dayData = this.forecastArray.properties.periods.filter(
          (el) => el.startTime.substring(0, 10) === this.day.id && el.isDaytime
        );
        this.forecast = dayData[0].shortForecast;
        this.temp = dayData[0].temperature;
        this.forecastimg = dayData[0].icon;
        this.detailedForecast = dayData[0].detailedForecast;
      }
    },
  },

  computed: {
    icon() {
      if (this.forecastArray.properties) {
        if (
          this.forecastArray.properties.periods.filter(
            (el) =>
              el.startTime.substring(0, 10) === this.day.id && el.isDaytime
          )[0]
        ) {
          if (
            this.forecastArray.properties.periods
              .filter(
                (el) =>
                  el.startTime.substring(0, 10) === this.day.id && el.isDaytime
              )[0]
              .shortForecast.includes("Rain")
          ) {
            return "mdi-weather-rainy";
          } else {
            return "mdi-weather-sunny";
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  height: 97px;
  border: 0.1rem solid gray;
  text-align: left;
  padding: 0;
  overflow: auto;
  width: 166px;
  position: relative;
}

.v-col > .weatherIcon {
  font-size: 1rem;
}

.v-icon {
  font-size: 0.2rem;
}
.v-row {
  margin: 0;
}

p {
  font-size: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 1.2rem;
  width: 130px;
  margin-left: 10px;
  padding-top: 6px;
  line-height: 0.4rem;
  margin-bottom: 0;
  cursor: pointer;
}

p:hover {
  text-decoration: underline;
}

#dateNumber {
  text-align: right;
  position: sticky;
  top: 0;
  background-color: rgba(26, 32, 44, 1);
  z-index: 2;
}

.is-not-in-month * {
  opacity: 1;
}

.is-not-in-month * .v-row {
  opacity: 0;
}

.v-col {
  padding: 0;
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

.v-chip {
  cursor: pointer;
}
</style>
