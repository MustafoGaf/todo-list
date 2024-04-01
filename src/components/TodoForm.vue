<template>
  <div class="sm:w-4/5 w-[97%] lg:w-1/2">
    <form
      class="flex flex-col items-center gap-2 sm:gap-4"
      @submit.prevent="
        {
          $emit('create', title), (title = '');
        }
      "
    >
      <input
        class="w-full px-4 py-2 rounded-md border border-gray-800 shadow-sm text-base"
        type="text"
        placeholder="Введите дело"
        v-model="title"
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
</template>

<script setup>
import { ref } from "vue";
const title = ref("");
</script>
