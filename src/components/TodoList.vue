<template>
  <div class="flex flex-col items-center">
    <todo-form @create="addTodo" />
    <div class="m-3">
      <select name="sort" class="p-2" v-model="sortValue" @change="sortTodos">
        <option value="default">Сортировка задач:</option>
        <option value="sortedById">По ID(1-9)</option>
        <option value="sortedByDate">По дата(новый-cтарый)</option>
      </select>
    </div>

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
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TodoForm from "./TodoForm.vue";
import TodoItems from "./TodoItems.vue";
import MyModal from "./UI/MyModal.vue";
const store = useStore();
const router = useRouter();
const todos = computed(() => store.getters.getTodos);
const modalOpen = ref(false);
const editeTodoValue = ref("");
const idx = ref(0);
const sortValue = ref("default");
const addTodo = (title) => {
  store.commit("addTodos", title);
};
const deleteTodo = (id) => {
  store.commit("deleteTodo", id);
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
  store.commit("sortedTodo", sortValue.value);
};
onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser != null) {
    try {
      store.dispatch("fetchTodos", currentUser.access);
    } catch (error) {
      localStorage.clear();
      router.push("/login");
    }
  }
});
</script>
