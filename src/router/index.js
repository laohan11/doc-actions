import { createRouter, createWebHistory } from 'vue-router'
import { docRoutes } from './docs'
import { addTab } from '@/composables/useDocTabs'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' },
  },
  // 由 src/views 目录结构自动生成的文档路由
  ...docRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 切换文档时回到顶部，锚点跳转时定位到对应标题
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - doc-actions` : 'doc-actions'
  addTab(to)
})

export default router
