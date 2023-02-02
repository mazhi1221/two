import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/deviceManagement'
    },
    {
      path: '/',
      name: 'deviceManagement',
      component: () => import('/src/views/deviceManagement/index.vue'),
    },
    {
      path: '/deviceManagement',
      name: 'deviceManagement',
      component: () => import('/src/views/deviceManagement/index.vue'),
    },
  ]
})

export default router
