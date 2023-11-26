<template>
  <v-card width="200">
    <v-card-item>
      <v-card-title> {{ location }}</v-card-title>
      <v-img cover :src="forecastimg" width="200">
        <v-card-subtitle> </v-card-subtitle
      ></v-img>
    </v-card-item>

    <v-card-text>{{ forecast }} {{ temp }}&#8457;</v-card-text>
    <v-card-text>{{ detailedForecast }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "WeatherComponent",
  props: [
    "day",
    "temp",
    "forecast",
    "location",
    "forecastimg",
    "detailedForecast",
  ],
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-card {
  color: lightgray;
}
</style>
