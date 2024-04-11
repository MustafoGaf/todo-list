import router from "../../router/index";
export default {
  actions: {
    async getAllUsers({ commit }, token) {
      const response = await fetch("http://localhost:8000/api/admin/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      });
      if (response.status == 200) {
        const { data } = await response.json();

        commit("updateAllUsers", data);
      } else if (response.status == 401) {
        localStorage.clear();

        commit("saveUserData", { username: "", isAdmin: false });

        router.push("/login");
      } else {
        router.push("/");
      }
    },
    async getAllTodos({ commit }, token) {
      const response = await fetch("http://localhost:8000/api/admin/todos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
      });
      if (response.status == 200) {
        const { data } = await response.json();
        
        commit("updateAllTodos", data);
      } else if (response.status == 401) {
        localStorage.clear();
        router.push("/login");
      } else {
        router.push("/");
      }
    },
  },
  mutations: {
    updateAllUsers(state, users) {
      state.allusers = users;
    },
    updateAllTodos(state, todos) {
      state.alltodos = todos;
    },
  },
  state: {
    allusers: [],
    alltodos: [],
  },
  getters: {
    getAllUser(state) {
      return state.allusers;
    },
    getAllTodos(state) {
      return state.alltodos;
    },
  },
};
