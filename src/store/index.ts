import Vuex from "vuex";

import user from "./modules/user";
import admin from "./modules/admin";
import todos from "./modules/todos";
export default new Vuex.Store({
  modules: {
    user,
    admin,
    todos,
  },
});
