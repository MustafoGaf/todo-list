<template>
  <div
    v-if="isOpen"
    class="absolute top-0 left-0 right-0 bottom-0 bg-[#00000036] flex justify-center items-center"
    @click="$emit('update:isOpen', false)"
  >
    <div @click.stop class="w-3/4 sm:w-2/4 bg-white py-6 px-6">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  isOpen: Boolean,
});
</script>
