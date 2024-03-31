<template>
  <div class="flex flex-col items-center">
    <div class="w-4/5 lg:w-1/2">
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
    <div class="m-3">
      <select name="sort" class="p-2" v-model="sortValue">
        <option value="default">Сортировка:</option>
        <option value="sortedById">Сортировка задач по ID(1 - 9)</option>
        <option value="sortedByDate">
          Сортировка задачи по дата(старый - новый)
        </option>
      </select>
    </div>
    <div class="w-3/4">
      <div
        v-for="(todo, index) in sortTodoList"
        :key="index"
        class="w-full border mt-3 py-3 px-4 flex justify-between"
      >
        <p class="text-xl text-indigo-700 font-medium">{{ todo.title }}</p>
        <div>
          <button
            @click="deleteTodo(todo.id)"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-[10px] mr-1"
          >
            Удалить
          </button>
          <button
            @click="openModal(todo.id)"
            class="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-[10px]"
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="modalOpen"
    class="absolute top-0 left-0 right-0 bottom-0 bg-[#00000036] flex justify-center items-center"
  >
    <div class="w-2/4 bg-white py-6 px-6 flex flex-col gap-3 relative">
      <span
        class="text-3xl font-semibold absolute right-6 top-0 cursor-pointer"
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
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from "vue";

export default {
  setup() {
    const modalOpen = ref(false);
    const todos = reactive([]);
    const index = ref(1);
    let editeTodoValue = ref("");
    const idx = ref(0);
    const sortValue = ref("default");
    const addTodo = (e) => {
      console.log(todos);
      e.preventDefault();
      let index = ref(1);
      const newData = {
        id: new Date().getTime(),
        title: e.target["title"].value,
        date: new Date().getTime(),
      };
      todos.push(newData);

      e.target["title"].value = "";
      index.value = 2;
    };
    const deleteTodo = (id) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
      }
    };
    const openModal = (id) => {
      idx.value = id;
      const todo = todos.filter((todo) => todo.id == id);
      modalOpen.value = true;

      editeTodoValue.value = todo[0].title;
    };
    const editTodo = () => {
      const todo = todos.find((todo) => todo.id == idx.value);

      if (todo) {
        todo.title = editeTodoValue.value;
      }
      modalOpen.value = false;
      idx.value = 0;
    };

    const sortTodoList = computed(() => {
      if (sortValue.value == "sortedById") {
        return todos.sort((a, b) => a.id - b.id);
      } else if (sortValue.value == "default") {
        return todos;
      } else if (sortValue.value == "sortedByDate") {
        return todos.sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          }
        });
      }
    });

    return {
   
      addTodo,
      deleteTodo,
      modalOpen,
      openModal,
      editeTodoValue,
      editTodo,
      sortValue,
      sortTodoList,
    };
  },
};
</script>
