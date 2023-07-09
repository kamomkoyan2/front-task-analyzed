<script setup lang="ts">
import {ref, watch, onMounted} from 'vue';
import Input from "@/components/includes/Input.vue"
import Button from '@/components/includes/Button.vue'
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import {useServerRequest} from "@/composables/useServerRequest";
import {useRoute, useRouter} from "vue-router";
import Loading from "@/components/includes/Loading.vue";


const router = useRouter()
const route = useRoute()
const { responseData,  loading, makeRequest } = useServerRequest();



const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['node_key'],
  queryFn:  async () => {
    const data = await fetchNodeById()
    return data
  },
});


async function fetchNodeById() {
 const data =   await makeRequest(`${import.meta.env.VITE_API_URI}/nodes/${route.params.id}`);
  return data
}

const form = ref({
  name: '',
  properties: {
    email: '',
    position: '',
    salary: '',
    description: ''

  }
})


watch(data, (newData) => {
  if (newData) {
    form.value.name = newData.name;
    form.value.properties.email = newData.properties.email;
    form.value.properties.position = newData.properties.position;
    form.value.properties.salary = newData.properties.salary;
    form.value.properties.description = newData.properties.description;

  }
});
async function updateNode() {
  await makeRequest(`${import.meta.env.VITE_API_URI}/nodes/${route.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form.value),
  });
  await router.push('/')
}



</script>



<template>
  <div>
    {{error}}
    <div v-if="isError">
      {{error}}
    </div>
<!--    <div v-if="isPending">-->
<!--      <Loading />-->
<!--    </div>-->

    <section  v-else class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div class="flex justify-between items-center">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Node</h2>
          <h2><a href="/" class="cursor-pointer  inline-flex items-center rounded-full mb-4 px-5 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
            </svg>
            Go Back</a></h2>
        </div>

        <form
            method="POST"
            @submit.prevent="updateNode">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <Input
                  id="name"
                  type="text"
                  v-model="form.name"
                  placeholder="Name"
                  required
              />
            </div>
            <div class="w-full">
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <Input
                  id="name"
                  type="email"
                  v-model="form.properties.email"
                  placeholder="e-mail"
                  required
              />
            </div>
            <div class="w-full">
              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
              <Input
                  id="name"
                  type="text"
                  v-model="form.properties.position"
                  placeholder="Position"
                  required
              />
            </div>
            <div>
              <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
              <Input
                  id="name"
                  type="number"
                  v-model="form.properties.salary"
                  placeholder="Salary"
                  required
              />
            </div>
            <div class="sm:col-span-2">
              <Input
                  id="name"
                  type="number"
                  v-model="form.properties.salary"
                  placeholder="Salary"
                  required
              />
            </div>
          </div>
          <Button as="button" type="submit" class=" cursor-pointer inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Update Node
          </Button>
        </form>
      </div>
    </section>
  </div>
</template>