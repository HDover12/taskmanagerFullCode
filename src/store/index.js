import { createStore } from "vuex";

export default createStore({
  state: {
    taskList: [],
  },
  getters: {
    tasks(state) {
      return state.taskList;
    },
  },
  mutations: {
    setTaskList(state, taskList) {
      Object.keys(taskList).forEach((key) => {
        taskList[key].id = key;
      });
      state.taskList = Object.keys(taskList).map((key) => taskList[key]);
    },
  },
  actions: {
    getTaskList(context) {
      fetch("https://task5-16333-default-rtdb.firebaseio.com//tasks.json")
        .then((r) => {
          if (r.ok) {
            return r.json();
          }
        })
        .then((data) => {
          context.commit("setTaskList", data);
        });
    },
  },
});
