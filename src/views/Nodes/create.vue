<script setup lang="ts">
import {ref, reactive} from 'vue';
import Input from "@/components/includes/Input.vue"
import Button from '@/components/includes/Button.vue'
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import {useServerRequest} from "@/composables/useServerRequest";
import { useRouter} from "vue-router";


const queryClient = useQueryClient()
const router = useRouter()
const { responseData, error, loading, makeRequest } = useServerRequest();

const form = reactive({
  name: '',
  properties: {
    email: '',
    position: '',
    salary: '',
    description: ''
  }
})

const mutation = useMutation({
  mutationFn: postNode,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['nodes'] })
  },
})

async function postNode() {
  const  response =   await makeRequest(`${import.meta.env.VITE_API_URI}/nodes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  await router.push({path: '/', query: { data: response.message } })
}



</script>



<template>
<div>
    <section class="bg-white dark:bg-gray-900 drop-shadow-lg">
      <div class="py-8 px-4 mx-auto max-w-xl lg:py-16  ">
        <div class="flex justify-between items-center">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Node</h2>
          <h2><a href="/" class="cursor-pointer inline-flex items-center rounded-full mb-4 px-5 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Go Back</a></h2>
        </div>

        <form
            method="POST"
            @submit.prevent="postNode"
            class="px-8 pt-6 pb-8 mb-4"
        >
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <Input
                  id="name"
                  type="text"
                  label="Full Name"
                  v-model="form.name"
                  required
              />
            </div>
            <div class="w-full">
              <Input
                  id="name"
                  type="email"
                  label="E-MAIL"
                  v-model="form.properties.email"
                  required
              />
            </div>
            <div class="w-full">
              <Input
                  id="name"
                  type="text"
                  label="Position"
                  v-model="form.properties.position"
                  required
              />
            </div>
            <div>
              <Input
                  id="name"
                  type="number"
                  label="Salary"
                  v-model="form.properties.salary"
                  required
              />
            </div>
            <Input
                id="name"
                type="text"
                label="Job Description"
                v-model="form.properties.description"
                required
            />
          </div>
          <Button as="button" type="submit" class=" cursor-pointer inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Add Node
          </Button>
        </form>
      </div>
    </section>
</div>

</template>