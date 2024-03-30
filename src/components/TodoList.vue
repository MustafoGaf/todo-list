<script lang="ts">
type TodosType = {
  id?: number;
  title?: string;
  date?: string;
};
export default {
  setup() {
    const todos: TodosType[] = [];

    return { todos };
  },
};
</script>
<template>
  <div class="flex flex-col items-center">
    <div class="w-4/5">
      <form action="" class="flex flex-col items-center gap-4">
        <input
          class="w-full px-4 py-2 rounded-md border border-gray-800 shadow-sm text-base"
          type="text"
          placeholder="Введите дело"
          required
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px]"
        >
          Создать задач
        </button>
      </form>
    </div>
  </div>
</template>
