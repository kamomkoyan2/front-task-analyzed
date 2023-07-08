import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Nodes/index.vue'
import NodeCreate from '@/views/Nodes/create.vue'
import NodeEdit from '@/views/Nodes/edit.vue'
import Neo4j from '@/views/Nodes/neo4j/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "Home",
      component: Home
    },
    {
      path: '/node/create',
      name: "NodeCreate",
      component: NodeCreate
    },
    {
      path: '/nodes/edit/:id',
      name: "NodeEdit",
      component: NodeEdit
    },
    {
      path: '/nodes/neo4j',
      name: "Neo4j",
      component: Neo4j
    }
  ]
})

export default router
