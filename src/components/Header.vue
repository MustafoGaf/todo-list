<template>
  <header class="mb-6">
    <div
      class="px-4 text-[30px] font-bold text-white bg-blue-500 h-16 flex items-center justify-between"
    >
      <div>
        <h1>Todo List</h1>
      </div>
      <div v-if="user.isAdmin" class="flex gap-4">
        <router-link to="/">
          <p class="text-lg hover:text-red-600">Список задач</p>
        </router-link>
        <router-link to="/admin">
          <p class="text-lg hover:text-red-600">Админка</p>
        </router-link>
      </div>
      <div v-if="user.username" class="flex items-center gap-2 text-base">
        <p class="text-white text-lg">{{ user.username }}</p>
        <button
          @click="logout"
          class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Выйти
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
const store = useStore();
const router = useRouter();
const hasLogin = ref(false);
const user = computed(() => store.getters.getUserData);

const logout = () => {
  localStorage.clear();
  store.commit("updateTodos", []);
  store.commit("saveUserData", { username: "", isAdmin: false });
  router.push("/login");
};
onMounted(() => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser != null) {
    const { username, isAdmin } = jwtDecode(JSON.parse(currentUser).access);
    store.commit("saveUserData", { username, isAdmin });
  }
});
</script>
