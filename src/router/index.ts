import { createWebHistory, createRouter } from "vue-router";
//@ts-ignore
import TodoPage from "../pages/TodoPage.vue";
//@ts-ignore
import Login from "../pages/LoginPage.vue";

const routes = [
  { path: "/", name: "todo", meta: { auth: true }, component: TodoPage },
  { name: "login", path: "/login", component: Login },
  {
    path: "/admin",
    meta: { auth: true, admin: true },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const curentUser = localStorage.getItem("currentUser");
  const requireAuth = to.matched.some((record) => record.meta.auth);
  const requireAdmin = to.matched.some((record) => record.meta.admin);
  if (curentUser == null && to.path !== "/login") {
    next("/login");
  } else if (curentUser && to.path == "/admin") {
    next("/");
  } else {
    next();
  }
});
export default router;
