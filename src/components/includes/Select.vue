<template>
  <div>
    <Listbox :value="modelValue">
      <div class="relative mt-1">
        <label v-if="label" class="block mb-1 text-left text-sm" :for="name">{{
            label
          }}</label>

        <ListboxButton
            class="relative border-none  cursor-pointer rounded-lg bg-white py-4 px-4 pl-2 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
        >
          <span class="">{{
              !modelValue ?'select node ' : modelValue
            }}</span>
          <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <ListboxOptions
              class="absolute h-220px overflow-y-scroll mt-1 z-10 width-100px   rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="node in nodes"
                :key="node.node.properties.id"
                :value="node.node.properties.id"
                as="template"
                @click="$emit('update:modelValue', node.node.properties.id)"
            >
              <div
                  :class="[
                  active ? 'bg-primary-500  text-white' : 'text-gray-900',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ node.node.properties.id}}</span
                >
                <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon
                      class="h-5 w-5 text-white"
                      aria-hidden="true"
                  />
                </span>
              </div>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

defineProps({
  modelValue: [String, Object],
  nodes: {
    type: Array,
    required: true,
  },
  label: String,
});
defineEmits(['update:modelValue'])


</script>
