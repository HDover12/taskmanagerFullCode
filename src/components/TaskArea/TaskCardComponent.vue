<template>
  <v-btn @click="overlay = !overlay">
    <v-card width="200" color="#385F73">
      <v-card-item>
        <v-card-title> {{ title }}</v-card-title>

        <v-card-subtitle
          >Building: <v-divider></v-divider> {{ building }}</v-card-subtitle
        >
        <v-card-subtitle>
          Scheduled Test Date:
          <v-divider></v-divider>

          {{ formatDate.toLocaleDateString() }}</v-card-subtitle
        >
      </v-card-item>
      <v-card-text>
        <v-list density="compact" lines="one"
          >Tests Required: <v-divider thickness="2"></v-divider>
          <v-list-item v-for="eachTest in testType" :key="eachTest">{{
            eachTest
          }}</v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-overlay
      v-model="overlay"
      class="align-center justify-center"
      scrim="rgba(0, 0, 0, 0.9)"
      transition="scale-transition"
      ><TaskMoreInfo
        :id="id"
        :title="title"
        :building="building"
        :testType="testType"
        :gases="gases"
        :projectCoordinator="projectCoordinator"
        @closeOverlay="overlay = false"
      />
    </v-overlay>
  </v-btn>
</template>

<script>
import TaskMoreInfo from "./TaskMoreInfoComponent.vue";

export default {
  name: "TaskCardComponent",
  props: [
    "id",
    "title",
    "building",
    "testType",
    "gases",
    "date",
    "projectCoordinator",
  ],
  computed: {
    formatDate() {
      return new Date(this.date);
    },
  },
  components: {
    TaskMoreInfo,
  },
  data() {
    return {
      overlay: false,
    };
  },
};
</script>

<style scoped>
.v-btn {
  margin: 2%;
  height: 100%;
  padding: 16px 16px;
}

.v-card-text {
  padding: 4px;
}

.v-list-item--density-compact.v-list-item--one-line {
  padding: 0;
  min-height: 25px;
  font-size: 0.8rem;
  overflow: visible;
}
.v-divider {
  margin: 4px 6px;
}
</style>
