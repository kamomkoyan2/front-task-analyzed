<script setup lang="ts">
defineProps({
  transition: {
    type: String,
    default: "slide",
  },
  background: Boolean,
  contained: Boolean,
});

const config = {
  slide: {
    enterFromClass: "opacity-0 translate-y-full",
    enterActiveClass: "transform-gpu transition duration-500 ease-in-out",
    enterToClass: "opacity-100 translate-y-0",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveActiveClass: "transform-gpu transition duration-500 ease-in-out",
    leaveToClass: "opacity-0 translate-y-full",
  },
  pop: {
    enterFromClass: "opacity-0 scale-95",
    enterActiveClass: "transform-gpu transition duration-500 ease-in-out",
    enterToClass: "opacity-100 scale-100",
    leaveFromClass: "opacity-100 scale-100",
    leaveActiveClass: "transform-gpu transition duration-500 ease-in-out",
    leaveToClass: "opacity-0 scale-95",
  },
  home: {
    enterFromClass: "opacity-0 translate-x-full",
    enterActiveClass: "transform-gpu transition duration-500 ease-in-out",
    enterToClass: "opacity-100 translate-x-0",
    leaveFromClass: "opacity-100 translate-x-0",
    leaveActiveClass:
        "!absolute top-[84px] w-full transform-gpu transition duration-500 ease-in-out",
    leaveToClass: "opacity-0 translate-x-full",
  },
  opacity: {
    enterFromClass: "opacity-0",
    enterActiveClass: "transition-opacity duration-500 ease-in-out",
    enterToClass: "opacity-100",
    leaveFromClass: "opacity-100",
    leaveActiveClass: "transition-opacity duration-500 ease-in-out",
    leaveToClass: "opacity-0",
  },
};
</script>

<template>
  <Transition v-bind="config.opacity">
    <div
        v-if="background"
        :class="[
        contained ? 'absolute bg-gray-900/40' : 'fixed bg-gray-900/60',
        'inset-0 z-20',
      ]"
    />
  </Transition>
  <Transition v-bind="config[transition]">
    <slot />
  </Transition>
</template>
