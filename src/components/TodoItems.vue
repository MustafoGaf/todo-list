<template>
  <div class="sm:w-3/4 w-[97%]">
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="w-full border mt-3 py-3 px-4 flex flex-col sm:flex-row gap-4 justify-between"
    >
      <div>
        <p class="text-xl text-indigo-700 font-medium">{{ todo.title }}</p>
      </div>
      <div>
        <button
          @click="$emit('delete', todo.id)"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 sm:px-4 text-sm rounded-[10px] mr-1"
        >
          Удалить
        </button>
        <button
          @click="$emit('update', todo.id)"
          class="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-2 sm:px-4 text-sm rounded-[10px]"
        >
          Изменить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  todos: Array,
});
</script>
