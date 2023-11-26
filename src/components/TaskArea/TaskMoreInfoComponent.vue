<template>
  <EditTask
    v-if="edit"
    :id="id"
    :title="title"
    :building="building"
    :testType="testType"
    :gases="!gases ? [] : gases"
    :projectCoordinator="projectCoordinator"
    :rataNeeded="rataNeeded"
    @close="edit = false"
  />
  <v-card color="#385F73" v-else>
    <v-card-item>
      <v-card-title> {{ title }}</v-card-title>
      <v-btn
        id="xOut"
        variant="tonal"
        @click="$emit('closeOverlay')"
        icon="mdi-close"
        density="compact"
      ></v-btn>
      <v-divider thickness="2"></v-divider>
      <v-card-subtitle>Building: {{ building }}</v-card-subtitle>
      <v-card-subtitle
        >Project Coordinator: {{ projectCoordinator }}</v-card-subtitle
      >
    </v-card-item>

    <v-card-text>
      Requires the following test(s):

      <v-list density="compact">
        <v-list-item v-for="test in testType" :key="test"
          >- {{ test }}
          <v-list
            density="compact"
            v-if="test == 'Relative Accuracy Test Audit'"
          >
            <v-list-item
              v-for="gas in gases"
              :key="gas"
              prepend-icon="mdi-chevron-right"
            >
              {{ gas }}
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-btn prepend-icon="mdi-pencil" variant="tonal" @click="editOn"
      >Edit</v-btn
    >
  </v-card>
</template>

<script>
import EditTask from "./EditTask.vue";

export default {
  components: {
    EditTask,
  },
  name: "TaskMoreInfoComponent",
  props: ["id", "title", "projectCoordinator", "gases", "building", "testType"],
  data() {
    return {
      edit: false,
    };
  },

  methods: {
    editOn() {
      this.edit = true;
    },
  },
  computed: {
    rataNeeded() {
      var rataIsNeeded = false;
      if (this.testType) {
        for (let i = 0; i < this.testType.length; i++) {
          if (this.testType[i] === "Relative Accuracy Test Audit") {
            rataIsNeeded = true;
          } else {
            rataIsNeeded = false;
          }
        }
        return rataIsNeeded;
      } else {
        return rataIsNeeded;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  height: 60vh;
  width: 40vw;
  overflow: auto;
  border-radius: 8px;
}

.v-card-subtitle {
  padding-top: 5px;
}

.v-list {
  margin-top: 10px;
  border-radius: 6px;
}

.v-btn {
  position: fixed;
  right: 3%;
  bottom: 1%;
  font-size: 0.7rem;
  padding: 0 0.7rem;
}
#xOut {
  position: fixed;
  top: 8px;
  padding: 0;
}
</style>
