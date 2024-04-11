import router from "../../router/index";

export default {
  actions: {
    async fetchTodos({ commit }, token) {
      const response = await fetch("http://localhost:8000/api/todos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      });
      if (response.status == 200) {
        const { data } = await response.json();
        commit("updateTodos", data);
      } else {
        localStorage.clear();
        commit("saveUserData", { username: "", isAdmin: false });
        router.push("/login");
      }
    },
  },
  mutations: {
    updateTodos(state, todos) {
      state.todos = todos;
    },
    addTodos(state, title) {
      const newTodo = {
        id: new Date().getTime(),
        title: title,
        date: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id != id);
    },
    sortedTodo(state, sortedBy) {
      if (sortedBy == "sortedById") {
        state.todos = state.todos.sort((a, b) => a.id - b.id);
      } else if (sortedBy == "default") {
        state.todos = state.todos;
      } else if (sortedBy == "sortedByDate") {
        state.todos = state.todos.sort((a, b) => {
        
          if (a.date > b.date) {
            return -1;
          }
        });
      }
    },
  },
  state: {
    todos: [],
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
};
