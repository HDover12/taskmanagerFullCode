<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        v-model="title"
        :counter="10"
        label="Title"
        required
      ></v-text-field>

      <v-select
        v-model="selectedTest"
        :items="items"
        label="Select Test Type"
        required
        multiple
      ></v-select>

      <v-select
        v-if="rataNeeded"
        v-model="selectedGas"
        :items="rataItems"
        :rules="[(v) => !!v || 'Item is required']"
        label="Select Gases"
        required
        multiple
      ></v-select>

      <v-text-field v-model="building" label="Building"></v-text-field>
      <v-text-field
        v-model="projectCoordinator"
        label="Project Coordinator"
      ></v-text-field>

      <div class="v-label">Select Test Due By Date:</div>
      <v-date-picker v-model="dueDate">
        <template v-slot="{ inputValue, inputEvents }">
          <v-text-field
            name="dueDate"
            class="v-field__input"
            :value="inputValue"
            v-on="inputEvents"
          ></v-text-field>
        </template>
      </v-date-picker>

      <div class="v-label">Select Test Date:</div>
      <v-date-picker v-model="date">
        <template v-slot="{ inputValue, inputEvents }">
          <v-text-field
            name="scheduleDate"
            class="v-field__input"
            :value="inputValue"
            v-on="inputEvents"
          ></v-text-field>

          <!-- <label class="v-label" for="scheduleDate">Scheduled Test Date</label>
          <input
            name="scheduleDate"
            class="v-field__input px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
            :value="inputValue"
            v-on="inputEvents"
          /> -->
        </template>
      </v-date-picker>

      <v-btn color="success" class="mr-4" @click="validate"> Add Task </v-btn>
      <v-btn prepend-icon="mdi-cancel" color="warning" @click="cancel"
        >Cancel</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "TaskMoreInfoComponent",
  data() {
    return {
      selectedTest: [],
      items: [
        "Metals",
        "Particulate Matter",
        "Hydrogen Chloride",
        "Dioxins/Furans",
        "Relative Accuracy Test Audit",
      ],
      rataItems: ["CO", "CO2", "O2", "NOx", "SO2"],
      selectedGas: [],
      projectCoordinator: "",
      building: "",
      title: "",
      newTask: {},
      date: new Date(),
      masks: {
        input: "YYYY-MM-DD",
      },
      dueDate: new Date(),
    };
  },
  methods: {
    validate() {
      this.newTask = {
        id: `${this.title} ${new Date()}`,
        title: this.title,
        testType: this.selectedTest,
        gases: this.selectedGas,
        building: this.building,
        projectCoordinator: this.projectCoordinator,
        date: this.date,
        dueDate: this.dueDate,
      };

      fetch("http://localhost:8080/tasks.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newTask),
      });
      this.$router.push("/");
    },
    cancel() {
      this.$router.push("/");
    },
  },
  computed: {
    rataNeeded() {
      var rataIsNeeded = false;
      for (let i = 0; i < this.selectedTest.length; i++) {
        if (this.selectedTest[i] === "Relative Accuracy Test Audit") {
          rataIsNeeded = true;
        } else {
          rataIsNeeded = false;
        }
      }
      return rataIsNeeded;
    },
  },
  watch: {
    rataNeeded(newvalue) {
      if (!newvalue) {
        this.selectedGas = [];
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  margin: 0 auto;
  width: 500px;
}

.v-label {
  text-align: left;
}
</style>
