<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="w-full max-w-md flex drop-shadow-xl  flex-col gap-y-2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-24px mt-4 text-center font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2" v-if="typeof message === 'string'">
                <div
                    :class="[
                    typeof message === 'string'
                      ? 'rounded-xl my-2  text-sm drop-shadow-lg text-green-600 bg-green-100 px-2 py-1'
                      : '',
                    'w-full px-4 py-3 disc focus:ring-1  focus:ring-main-dark focus:outline-none shadow-sm ',
                  ]"
                >
                  {{ message }}
                </div>
              </div>
              <div class="mt-6 justify-center flex">
                <Button as="button" class="text-center cursor-pointer border-none outline-none shadow-lg w-1/3" @click="closeModal"
                >Close
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import Button from '@/components/includes/Button.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: [Object, String],
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const closeModal = () => {
  props.onClose();
};
</script>
