export default {
  actions: {},
  mutations: {
    saveUserData(state, { username, isAdmin }) {
      state.user.username = username;
      state.user.isAdmin = isAdmin;
    },
  },
  state: {
    user: {
      username: "",
      isAdmin: false,
    },
  },
  getters: {
    getUserData(state) {
      return state.user;
    },
  },
};
