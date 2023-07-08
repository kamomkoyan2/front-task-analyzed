<script setup lang="ts">
import AppearTransition from '@/components/includes/AppearTransaction.vue';
import { RouterView } from 'vue-router';
import Header from "@/components/structure/Header.vue";

</script>

<template>
  <div >
    <Header />

    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <AppearTransition transition="opacity">
          <component class="h-screen" :is="Component" />
        </AppearTransition>
      </template>
    </RouterView>
    <Footer />
  </div>
</template>

<style>
body {
  @apply font-inter;
}

</style>

