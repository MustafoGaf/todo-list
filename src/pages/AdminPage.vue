<template>
  <h1 class="text-xl text-sky-700 text-center">Welcome To Admin Page</h1>
  <h1>Cписок задач: {{ todos.length }}</h1>
  <todo-items :todos="todos" />
  <div>
    <h1>Cписок пользователя: {{ users.length }}</h1>
    <user-list :users="users" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TodoItems from "../components/TodoItems.vue";
import UserList from "../components/UserList.vue";
const store = useStore();
const router = useRouter();

const todos = ref([]);
const users = ref([]);

const getTodos = async (token) => {
  const response = await fetch("http://localhost:8000/api/admin/todos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });
  if (response.status == 200) {
    const { data } = await response.json();
    console.log(data);
    todos.value = data;
  } else if (response.status == 401) {
    localStorage.clear();
    router.push("/login");
  } else {
    router.push("/");
  }
};
const getUsers = async (token) => {
  const response = await fetch("http://localhost:8000/api/admin/users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });
  if (response.status == 200) {
    const { data } = await response.json();
    console.log(data);
    users.value = data;
  } else if (response.status == 401) {
    localStorage.clear();

    store.commit("saveUserData", { username: "", isAdmin: false });

    router.push("/login");
  } else {
    router.push("/");
  }
};
onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("current User", currentUser);
  if (currentUser != null) {
    try {
      getTodos(currentUser.access);
      getUsers(currentUser.access);
    } catch (error) {}
  } else {
    localStorage.clear();
  }
});
</script>
