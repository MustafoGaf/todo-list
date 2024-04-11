<template>
  <main class="flex items-center justify-center mt-8">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl mb-4">Регистрация</h2>
      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <label for="username" class="block text-gray-700"
            >Имя пользователя</label
          >
          <input
            type="text"
            v-model="username"
            class="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Пароль</label>
          <input
            type="password"
            v-model="password"
            class="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <p class="text-red-800 text-lg my-2">{{ error }}</p>
        <button
          :disabled="loading"
          :class="{ 'blur-sm': loading }"
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  </main>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { jwtDecode } from "jwt-decode";
const store = useStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const loading = computed(() => store.getters.getLoading);
const error = computed(() => store.getters.getError);

const loginUser = async () => {
  store.dispatch("loginUser", {
    username: username.value,
    password: password.value,
  });
};
</script>
