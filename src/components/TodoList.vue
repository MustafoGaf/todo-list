<template>
  <div class="flex flex-col items-center">
    <div class="w-4/5">
      <form
        action=""
        class="flex flex-col items-center gap-4"
        @submit="addTodo"
      >
        <input
          class="w-full px-4 py-2 rounded-md border border-gray-800 shadow-sm text-base"
          type="text"
          placeholder="Введите дело"
          name="title"
          required
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]"
        >
          Создать задач
        </button>
      </form>
    </div>
    <div class="w-3/4">
      <div
        v-for="(todo, index) in todos"
        :key="index"
        class="w-full border mt-3 py-3 px-4 flex justify-between"
      >
        <p class="text-xl text-indigo-700 font-medium">{{ todo.title }}</p>
        <div>
          <p>{{ todo.id }}</p>
          <button
            @click="deleteTodo(todo.id)"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px] mr-1"
          >
            Удалить
          </button>
          <button
            class="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-[10px]"
          >
            Изменит
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import TodoList from "./TodoList.vue";
export default {
  setup() {
    let todos = reactive([]);
    const addTodo = (e) => {
      e.preventDefault();
      let index = ref(1);
      const newData = {
        id: new Date().getTime(),
        title: e.target["title"].value,
        date: new Date().getTime(),
      };
      todos.push(newData);
      index = index + 1;
      e.target["title"].value = "";
    };
    const deleteTodo = (id) => {
      const index = todos.findIndex((task) => task.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
      }
    };
    return { todos, addTodo, deleteTodo };
  },
};
</script>
