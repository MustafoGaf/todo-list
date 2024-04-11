import { jwtDecode } from "jwt-decode";
import router from "../../router/index";

export default {
  actions: {
    async loginUser({ commit }, userdata) {
      commit("updateLoading", true);
      try {
        const response = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdata),
        });

        const data = await response.json();
        if (response.status == 200) {
          localStorage.clear();
          localStorage.setItem("currentUser", JSON.stringify(data));
          commit("updateError", "");
          const { username, isAdmin } = jwtDecode<any>(data.access);
          commit("saveUserData", { username, isAdmin });
          router.push({ name: "todo" });
        } else {
          commit("updateError", data.detail);
        }
      } catch (error) {
        commit("updateError", "Что то произошло не так повторите попитку");
      } finally {
        commit("updateLoading", false);
      }
    },
  },
  mutations: {
    saveUserData(state, { username, isAdmin }) {
      state.user.username = username;
      state.user.isAdmin = isAdmin;
    },
    updateLoading(state, loading) {
      state.loading = loading;
    },
    updateError(state, error) {
      state.error = error;
    },
  },
  state: {
    user: {
      username: "",
      isAdmin: false,
    },
    loading: false,
    error: "",
  },
  getters: {
    getUserData(state) {
      return state.user;
    },
    getError(state) {
      return state.error;
    },
    getLoading(state) {
      return state.loading;
    },
  },
};
