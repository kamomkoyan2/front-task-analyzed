<script setup lang="ts">
import {ref, onMounted,watch} from 'vue'
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import Button from '@/components/includes/Button.vue'
import Loading from '@/components/includes/Loading.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Select from '@/components/includes/Select.vue'

import Neovis from 'neovis.js';
import {useServerRequest} from "@/composables/useServerRequest";
import Modal from "@/components/includes/Modal.vue";
import Input from "@/components/includes/Input.vue";

const processedData = ref(null)

const { responseData, loading, makeRequest } = useServerRequest();

const form = ref({
  sourceNodeId: '',
  targetNodeId: '',
  relationshipType: ''
})

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['graphs'],
  queryFn: fetchData
})

const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: connectNode,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['updateGraphs'] })
  },
})


async function connectNode() {
  await makeRequest(`${import.meta.env.VITE_API_URI}/nodes/connect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form.value),
  });
  drawGraph()
}




onMounted(() => {
  fetchData()
})

async function fetchData()   {
    const response = await fetch(`${import.meta.env.VITE_API_URI}/nodes/graphs`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
}

watch(
    () => data.value, // Watch for changes in the data value
    async (newValue) => {
      if (newValue) {
        // Process the new value as needed
        processedData.value = newValue
      }
    },
    { immediate: true } // Run the watcher immediately
);


function drawGraph() {
  const config: any = {
    containerId: 'visualization',
    neo4j: {
      serverUrl: "bolt://localhost:7687",
    },
    visConfig: {
      nodes: {
        shape: 'circle'
      },
      edges: {
        arrows: {
          to: {enabled: true}
        }
      },
    },
    labels: {
      // Define node labels to style differently (replace with your actual labels)
      '[Node]': {
        caption: 'name',
      },
    },
    relationships: {
      // Define relationship types to style differently (replace with your actual types)
      'FRIEND': {
        caption: true,
      },
    },
    initialCypher: 'MATCH (n:Node) OPTIONAL MATCH (n)-[r]->(m:Node) RETURN n, r, m'
  };

  const vis = new Neovis(config);
  vis.render();
}

let modalOpen = ref(true);

const onClose = () => {
  responseData.value = null
  modalOpen.value = false
};


onMounted(() => {
  drawGraph()
})
</script>


<template>

<div>
  <span v-if="isPending"><Loading /></span>
  <span v-else-if="isError">Error: {{ error.message }}</span>
  <Modal
      v-if="typeof responseData?.message === 'string' "
      :isOpen="true"
      :message="responseData.message"
      :onClose="onClose"
  />
  <div>
    <div class="border drop-shadow-2xl" id="visualization"></div>
  </div>
  <div class="flex">
    <form
        method="POST"
        @submit.prevent="connectNode"
        class="flex items-end gap-x-4 justify-center px-8 pt-6 pb-8 mb-4"
    >
    <Select
        id="gender"
        type="text"
        :nodes="data"
        v-model="form.sourceNodeId"
        required
    />

      <Input
          id="relationshipType"
          type="text"
          v-model="form.relationshipType"
          placeholder="Relation Type mention ex(Friend)"
          required

      />

    <Select
        id="gender"
        type="text"
        :nodes="data"
        v-model="form.targetNodeId"
        required
    />
      <Button as="button" :disabled="(form.sourceNodeId === '' || form.sourceNodeId === null) || (form.targetNodeId === '' || form.targetNodeId === null)" type="submit" class=" cursor-pointer inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
        Connect Nodes
      </Button>
    </form>
  </div>


</div>



</template>


<style scoped>
#visualization {
  height: 600px;
}
</style>