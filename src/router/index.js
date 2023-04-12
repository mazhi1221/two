import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('/src/views/home/index.vue'),
    },
    {
      path: '/drawerHome',
      name: 'drawerHome',
      component: () => import('/src/views/drawerHome/index.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
})


export default router
