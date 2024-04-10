<template>
  <div class="container mx-auto">
    <h1 class="text-xl text-center mt-8">Таблица пользователей</h1>
    <table class="table-auto mt-4">
      <thead>
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Username</th>
          <th class="px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="border px-4 py-2">{{ user.id }}</td>
          <td class="border px-4 py-2">{{ user.username }}</td>
          <td class="border px-4 py-2">{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  users: Array,
});
</script>
