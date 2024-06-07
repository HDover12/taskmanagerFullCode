<template>
  <v-card color="#385F73">
    <div>
      <v-form>
        <v-card-item>
          <v-card-title> Editing: {{ title }}</v-card-title>
          <v-divider thickness="2"></v-divider>
          <v-card-subtitle
            >Building:
            <input v-model="newBuilding" />
          </v-card-subtitle>
          <v-card-subtitle
            >Project Coordinator: <input v-model="newProjectCoordinator"
          /></v-card-subtitle>
        </v-card-item>

        <v-card-text>
          Requires the following test(s):
          <br />
          <v-list density="compact">
            <v-list-item v-for="test in items" :key="test">
              <input
                type="checkbox"
                :name="test"
                :value="test"
                v-model="newTests"
              />
              <label :for="test"> {{ test }}</label
              ><br />
            </v-list-item>
            <v-list density="compact" v-if="newrataNeeded" id="gaslist">
              <v-list-item v-for="gas in rataItems" :key="gas">
                <input
                  type="checkbox"
                  :name="gas"
                  :value="gas"
                  v-model="newGases"
                />
                <label :for="gas"> {{ gas }}</label
                ><br />
              </v-list-item>
            </v-list>
          </v-list>
        </v-card-text>
      </v-form>

      <div id="buttons">
        <v-btn
          prepend-icon="mdi-content-save"
          @click="saveChanges(id)"
          color="success"
          >Save</v-btn
        >
        <v-btn
          prepend-icon="mdi-delete-circle"
          color="error"
          @click="deleteItem(id)"
          >Delete</v-btn
        >

        <v-btn prepend-icon="mdi-cancel" color="warning" @click="$emit('close')"
          >Cancel</v-btn
        >
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditTask",
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    projectCoordinator: {
      type: String,
    },
    gases: {
      type: Array,
    },
    building: {
      type: String,
    },
    testType: {
      type: Array,
    },
    rataNeeded: {
      type: Boolean,
    },
  },
  data() {
    return {
      edit: false,
      newBuilding: this.building,
      newProjectCoordinator: this.projectCoordinator,
      newTests: this.testType,
      items: [
        "Metals",
        "Particulate Matter",
        "Hydrogen Chloride",
        "Dioxins/Furans",
        "Relative Accuracy Test Audit",
      ],
      rataItems: ["CO", "CO2", "O2", "NOx", "SO2"],
      newrataNeeded: this.rataNeeded,
      newGases: this.gases,
    };
  },
  watch: {
    newTests(newvalue) {
      for (let i = 0; i < newvalue.length; i++) {
        if (newvalue[i] === "Relative Accuracy Test Audit") {
          this.newrataNeeded = true;
        } else {
          this.newrataNeeded = false;
        }
      }
    },
  },
  computed: {},
  unmounted() {
    this.getTaskList();
  },
  methods: {
    ...mapActions(["getTaskList"]),
    deleteItem(id) {
      var del = confirm("Are you sure you want to delete?");
      if (del == true) {
        var tagid = id;
        fetch(
          `https://task5-16333-default-rtdb.firebaseio.com//tasks/${tagid}.json`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.text())
          .then((res) => console.log(res));
        this.getTaskList();
      }
    },
    saveChanges(id) {
      var tagid = id;
      fetch(
        `https://task5-16333-default-rtdb.firebaseio.com//tasks/${tagid}.json`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",

          body: JSON.stringify({
            id: this.id,
            title: this.title,
            projectCoordinator: this.newProjectCoordinator,
            gases: this.newGases,
            building: this.newBuilding,
            testType: this.newTests,
            rataNeeded: this.newrataNeeded,
          }),
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });

      this.$emit("close");
      this.getTaskList();
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
.v-card-text {
  padding-bottom: 5px;
}
.v-card-subtitle {
  padding-top: 5px;
}

.v-list {
  margin-top: 10px;
  border-radius: 6px;
  padding-left: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
}

input {
  border: 2px solid black;
  padding-left: 3px;
}
div {
  position: relative;
}

.v-btn {
  font-size: 0.7rem;
  padding: 0 0.7rem;
  margin: 0 3px;
}

#buttons {
  position: absolute;
  right: 3%;

  padding-bottom: 10px;
}

label {
  padding-left: 7px;
  margin-top: -2px;
}
#gaslist {
  padding-left: 40px;
  margin-top: 0;
  padding-top: 0;
}
</style>
