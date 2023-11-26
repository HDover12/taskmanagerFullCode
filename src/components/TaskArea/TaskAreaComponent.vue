<template>
  <v-container>
    <v-row justify="end">
      <v-btn prepend-icon="mdi-plus" rounded="pill" to="/new"
        >Add new task</v-btn
      >
    </v-row>
    <v-row>
      <TaskCardComponent
        v-for="task in taskList"
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :building="task.building"
        :testType="task.testType"
        :gases="task.gases"
        :projectCoordinator="task.projectCoordinator"
        :date="task.date"
        :dueDate="task.dueDate"
      />
    </v-row>
  </v-container>
</template>

<script>
import TaskCardComponent from "./TaskCardComponent.vue";

import { mapGetters } from "vuex";

export default {
  name: "TaskAreaComponent",
  components: {
    TaskCardComponent,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["tasks"]),
    taskList() {
      return this.tasks;
    },
  },
  mounted() {
    this.$store.dispatch("getTaskList");
    console.log(this.taskList);
  },
};
</script>

<style scoped>
.v-row {
  justify-content: center;
}
</style>
