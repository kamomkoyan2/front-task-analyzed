<template>
  <div
      class="fixed top-0 left-0 bg-opacity-25 w-full h-full flex justify-center items-center z-10 justify-center items-end pb-8"
  >
    Loading <div class="dots"></div>
  </div>
</template>

<style scoped>
.dots {
  width: 56px;
  height: 26.9px;
  background: radial-gradient(circle closest-side,#474bff 90%,#0000) 0%   50%,
  radial-gradient(circle closest-side,#474bff 90%,#0000) 50%  50%,
  radial-gradient(circle closest-side,#474bff 90%,#0000) 100% 50%;
  background-size: calc(100%/3) 13.4px;
  background-repeat: no-repeat;
  animation: dots-7ar3yq 1s infinite linear;
}

@keyframes dots-7ar3yq {
  20% {
    background-position: 0%   0%, 50%  50%,100%  50%;
  }

  40% {
    background-position: 0% 100%, 50%   0%,100%  50%;
  }

  60% {
    background-position: 0%  50%, 50% 100%,100%   0%;
  }

  80% {
    background-position: 0%  50%, 50%  50%,100% 100%;
  }
}
</style>
<script setup lang="ts">
</script>