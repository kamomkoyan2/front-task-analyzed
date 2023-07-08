<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  name: String,
  label: String,
  placeholder: String,
  required: Boolean,
  readonly: Boolean,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: [String, Number],
  error: Array,
});
defineEmits(['update:modelValue']);

const proxyType = ref(props.type);
</script>

<template>
  <div class="text-main-dark">
    <label v-if="label" class="block mb-2 text-left text-sm" :for="name">{{
        label
      }}</label>
    <div class="relative">
      <input
          class="relative w-full border-none cursor-text rounded-lg bg-white py-4 px-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
          :id="name"
          :name="name"
          :type="proxyType"
          :value="modelValue"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="readonly"
          :required="required"
          @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>

    <div v-if="error" class="text-red-600 text-xs">
      <p v-for="item in error" :key="item" class="mt-1">
        {{ item }}
      </p>
    </div>
  </div>
</template>