<template>
  <div class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-end pb-8">
    <span class="pr-1 font-semibold text-gray-400 animate-pulse">
      Loading
    </span>
    <div class="dots w-10 h-5" />
  </div>
</template>

<style scoped>
.dots {
  background: -o-radial-gradient(circle closest-side, #acb8d4 90%, #0000) 0% 50%,
  -o-radial-gradient(circle closest-side, #acb8d4 90%, #0000) 50% 50%,
  -o-radial-gradient(circle closest-side, #acb8d4 90%, #0000) 100% 50%;
  background: radial-gradient(circle closest-side, #acb8d4 90%, #0000) 0% 50%,
  radial-gradient(circle closest-side, #acb8d4 90%, #0000) 50% 50%,
  radial-gradient(circle closest-side, #acb8d4 90%, #0000) 100% 50%;
  background-size: calc(100% / 2) 6px;
  background-repeat: no-repeat;
  -webkit-animation: dots-shake 1.6s infinite linear;
  animation: dots-shake 1.6s infinite linear;
}

@keyframes dots-shake {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%;
  }

  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%;
  }

  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%;
  }

  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%;
  }
}


</style>