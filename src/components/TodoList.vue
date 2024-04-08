<template>
  <div class="flex flex-col items-center">
    <todo-form @create="addTodo" />
    <div class="m-3">
      <select name="sort" class="p-2" v-model="sortValue" @change="sortTodos">
        <option value="default">Сортировка задач:</option>
        <option value="sortedById">По ID(1-9)</option>
        <option value="sortedByDate">По дата(старый-новый)</option>
      </select>
    </div>
    <router-link to="/login"><h1>Login</h1> </router-link>

    <todo-items
      :todos="todos"
      @delete="deleteTodo"
      @update="openModal"
      :sort="sortValue"
    />
  </div>
  <my-modal v-model:isOpen="modalOpen">
    <div class="flex flex-col gap-3 relative">
      <span
        class="text-3xl font-semibold absolute right-0 top-[-20px] cursor-pointer"
        @click="modalOpen = false"
        >X</span
      >
      <h1 class="text-2xl text-center text-black">Изменение задач</h1>
      <input
        type="text"
        class="border w-full mt-4 h-10 text-lg font-medium px-3"
        v-model="editeTodoValue"
      />
      <button
        @click="editTodo()"
        class="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-[10px]"
      >
        Сохранить
      </button>
    </div>
  </my-modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import TodoForm from "./TodoForm.vue";
import TodoItems from "./TodoItems.vue";
import MyModal from "./UI/MyModal.vue";

const modalOpen = ref(false);
const todos = ref([]);

const editeTodoValue = ref("");
const idx = ref(0);
const sortValue = ref("default");
const getTodos = async (token) => {
  const response = await fetch("http://localhost:8000/api/todos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });
  if (response.status == 200) {
    const { data } = await response.json();
    todos.value = data;
  } else {
    localStorage.clear();
    router.push("/login");
  }
};

const addTodo = (title) => {
  const newTodo = {
    id: new Date().getTime(),
    title: title,
    date: new Date().getTime(),
  };
  todos.value.push(newTodo);
};
const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id != id);
};
const openModal = (id) => {
  idx.value = id;
  editeTodoValue.value = todos.value.find((todo) => todo.id == id).title;
  modalOpen.value = true;
};
const editTodo = () => {
  todos.value.find((todo) => todo.id == idx.value).title = editeTodoValue.value;

  modalOpen.value = false;
  idx.value = 0;
};
const sortTodos = () => {
  if (sortValue.value == "sortedById") {
    todos.value = todos.value.sort((a, b) => a.id - b.id);
  } else if (sortValue.value == "default") {
    todos.value = todos.value;
  } else if (sortValue.value == "sortedByDate") {
    todos.value = todos.value.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
    });
  }
};
onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("current User", currentUser);
  if (currentUser != null) {
    try {
      getTodos(currentUser.access);
    } catch (error) {}
  }
});
</script>
