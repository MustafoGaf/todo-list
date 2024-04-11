import router from "../../router/index";

export default {
  actions: {
    async loginUser({ commit, dispatch }, userdata) {
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
          dispatch("userData", data.access);
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
    async userData({ commit }, token) {
      try {
        const response = await fetch("http://localhost:8000/auth/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(token),
          },
        });
        const { data } = await response.json();
        if (response.status == 200) {
          commit("saveUserData", {
            username: data.username,
            isAdmin: data.is_staff,
          });
        }
      } catch (error) {
        localStorage.clear();
        router.push("/login");
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
