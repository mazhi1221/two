import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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
      path: '/studiosCreate',
      name: 'studiosCreate',
      component: () => import('/src/views/studiosCreate/index.vue'),
    },
    {
      path: '/studiosManage',
      name: 'studiosManage',
      component: () => import('/src/views/studiosManage/index.vue'),
    }
  ],
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})

router.beforeEach((to, from, next) => {
  NProgress.start()
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
router.afterEach(() => {
  NProgress.done()
})


export default router
