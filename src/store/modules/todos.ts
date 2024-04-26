import router from "../../router/index";
// ин порчаи кодро аз гитхаби ту гирифтам рози боши ...
const filters = {
  sortedById: (todos) => todos.sort((a, b) => a.id - b.id),
  sortedByDate: (todos) => todos.sort((a, b) => (a.date > b.date ? -1 : 1)),
};

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
    async createTodos({ commit, dispatch }, { title, token, id }) {
      console.log(id, "lgkjfdklg");

      const response = await fetch("http://localhost:8000/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
        body: JSON.stringify({
          title: title,
          complete: false,
          fk_user: id,
          date: new Date().toISOString(),
        }),
      });
      if (response.status == 201) {
        const { data } = await response.json();
        console.log(">>>>", data);
        dispatch("fetchTodos", token);
      } else {
        localStorage.clear();
        commit("saveUserData", { username: "", isAdmin: false });
        router.push("/login");
      }
    },
    async deleteTodo({ commit, dispatch }, { token, id }) {
      console.log(id, "lgkjfdklg");

      const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      });
      if (response.status == 200) {
        dispatch("fetchTodos", token);
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
        state.todos = filters.sortedById(state.todos);
      } else if (sortedBy == "sortedByDate") {
        state.todos = filters.sortedByDate(state.todos);
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
