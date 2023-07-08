<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
  as: {
    type: [String, Object],
    default: RouterLink,
  },
  color: {
    type: String,
    default: 'black',
  },
  disabled: Boolean,
});

const styles = {
  white: 'bg-primary-500 text-main-dark',
  black: 'bg-primary-400 text-white',
  red: 'bg-red-400 text-white',
};
</script>

<template>
  <component
      :is="as"
      class="relative rounded-lg bg-primary-500 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
      :class="[
      disabled && 'opacity-75',
      styles[color],
      'block  p-4 font-bold shadow-sm rounded-full',
    ]"
      :disabled="disabled"
  >
    <slot />
  </component>
</template>
