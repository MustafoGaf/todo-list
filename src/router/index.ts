import { createWebHistory, createRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";

//@ts-ignore
import TodoPage from "../pages/TodoPage.vue";
//@ts-ignore
import Login from "../pages/LoginPage.vue";
//@ts-ignore
import Admin from "../pages/AdminPage.vue";

const routes = [
  { path: "/", name: "todo", meta: { auth: true }, component: TodoPage },
  { name: "login", path: "/login", component: Login },
  {
    path: "/admin",
    meta: { auth: true, admin: true },
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const curentUser = localStorage.getItem("currentUser");
  if (curentUser == null && to.path !== "/login") {
    next("/login");
  } else if (curentUser && to.path == "/login") {
    next("/");
  } else {
    next();
  }
});
export default router;
