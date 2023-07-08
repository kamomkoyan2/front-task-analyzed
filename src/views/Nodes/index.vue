<script setup lang="ts">
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import Button from '@/components/includes/Button.vue'
import Loading from '@/components/includes/Loading.vue'
import {useRouter, useRoute} from "vue-router";
import {useServerRequest} from "@/composables/useServerRequest";


const router = useRouter()
const { responseData, loading, makeRequest } = useServerRequest();
const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['nodes'],
  queryFn:  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URI}/nodes`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
})

const navigateToEdit = (nodeId) => {
  router.push({ path: `/nodes/edit/${nodeId}` });
};

const queryClient = useQueryClient()
const deleteMutation = useMutation({
  mutationFn: async (id) => {
    await makeRequest(`${import.meta.env.VITE_API_URI}/nodes/delete/${id}`, {
      method: 'DELETE',
    });
  },
   onSuccess: () => {
  queryClient.invalidateQueries('node_key');
  router.push('/');
},
});


function deleteNode(id) {
  deleteMutation.mutate(id);
}

</script>



<template>
<div>
  <span v-if="isPending"><Loading /></span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <div class="py-2">
    <Button to="/node/create" class="w-1/6 text-center cursor-pointer">Create Node</Button>
  </div>
  <div class="relative overflow-x-auto  sm:rounded-lg" >
    <table class="w-full text-sm text-left  ">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3">
          Node id
        </th>
        <th scope="col" class="px-6 py-3">
          name
        </th>
        <th scope="col" class="px-6 py-3">
          E-mail
        </th>
        <th scope="col" class="px-6 py-3">
          Position
        </th>
        <th scope="col" class="px-6 py-3">
          Salary
        </th>
        <th scope="col" class="px-6 py-3">
          Job Description
        </th>
        <th scope="col" class="px-6 py-3">
          Edit
        </th>
        <th scope="col" class="px-6 py-3">
          Delete
        </th>
      </tr>
      </thead>
      <tbody >
      <tr class="bg-white " v-for="node in data">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ node.id }}
        </th>
        <td class="px-6 py-4">
          {{ node.name }}
        </td>
        <td class="px-6 py-4">
          {{ node.properties.email }}
        </td>
        <td class="px-6 py-4">
          {{ node.properties.position }}
        </td>
        <td class="px-6 py-4">
          {{ node.properties.salary }}
        </td>
        <td class="px-6 py-4">
          {{ node.properties.description }}
        </td>
        <td class=" flex items-center justify-center">
          <div class="w-full">
            <a
                  @click="navigateToEdit(node.id)"
                  class='w-full text-center group flex cursor-pointer justify-center  w-full border-none px-2 py-2 text-sm'
            >

              Edit
            </a>

          </div>
        </td>
        <td class="">
          <div
              @click="deleteNode(node.id)"
              class=' cursor-pointer border-primary-100 drop-shadow-2xl text-center flex w-full px-2 py-2 items-center justify-center  text-sm'>
            Delete
          </div>

        </td>
      </tr>
      </tbody>

    </table>
  </div>
</div>


</template>